import React, { useState, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Modal, Input as AntInput, Button } from "antd";
import styled from "styled-components";
// import CryptoJS from "crypto-js";

interface GuestbookEntry {
  id: number;
  author: string;
  description: string;
  created: string;
  password: string;
}

const API_URL =
  import.meta.env.VITE_NODE_ENV === "production"
    ? import.meta.env.VITE_API_URL
    : "http://117.110.30.69:8099/db/guestbook";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Seoul",
  }).format(date);
};

const ITEMS_PER_PAGE = 5; // 페이지당 표시할 항목 수

const Guestbook = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [selectedEntryId, setSelectedEntryId] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // // 암호화 키 (실제 프로젝트에서는 환경변수로 관리하는 것을 추천)
  // const SECRET_KEY = "your-secret-key";

  // // 비밀번호 암호화 함수
  // const encryptPassword = (password: string) => {
  //   return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
  // };

  // // 비밀번호 복호화 함수
  // const decryptPassword = (encryptedPassword: string) => {
  //   const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
  //   return bytes.toString(CryptoJS.enc.Utf8);
  // };

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(entries.length / ITEMS_PER_PAGE);

  // 현재 페이지에 표시할 항목들
  const currentEntries = entries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const sortedData = data.sort(
        (a: GuestbookEntry, b: GuestbookEntry) =>
          new Date(b.created).getTime() - new Date(a.created).getTime()
      );
      setEntries(sortedData);
      // console.log("방명록 불러오기 성공", sortedData, response, data);
    } catch (error) {
      console.error("방명록을 불러오는데 실패했습니다:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: formData.get("author"),
          description: formData.get("description"),
          password: formData.get("password"), // 암호화 제거, 원본 비밀번호 전송
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("서버 응답:", data);

      form.reset();
      setIsWriting(false);
      fetchEntries();
    } catch (error) {
      console.error("방명록 작성에 실패했습니다:", error);
      alert("방명록 작성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleDelete = async () => {
    if (!selectedEntryId) return;

    try {
      const response = await fetch(`${API_URL}/${selectedEntryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: deletePassword,
        }),
      });

      if (!response.ok) {
        setDeleteModalOpen(true);
        return;
      }

      setEntries(entries.filter((entry) => entry.id !== selectedEntryId));
      setDeleteModalVisible(false);
      setDeletePassword("");
      setSelectedEntryId(null);
    } catch (error) {
      console.error("방명록 삭제 실패:", error);
      setDeleteModalOpen(true);
    }
  };

  return (
    <GuestbookContainer>
      <GuestbookTitle>방명록</GuestbookTitle>

      {!isWriting ? (
        <>
          <EntriesList>
            {currentEntries.map((entry) => (
              <EntryItem key={entry.id}>
                <EntryHeader>
                  <EntryName>{entry.author}</EntryName>
                  <HeaderRight>
                    <EntryDate>{formatDate(entry.created)}</EntryDate>
                    <DeleteButton
                      onClick={() => {
                        setSelectedEntryId(entry.id);
                        setDeleteModalVisible(true);
                      }}
                    >
                      <CloseOutlined />
                    </DeleteButton>
                  </HeaderRight>
                </EntryHeader>
                <EntryMessage>{entry.description}</EntryMessage>
              </EntryItem>
            ))}
          </EntriesList>

          {totalPages > 1 && (
            <Pagination>
              <PageButton
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                이전
              </PageButton>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PageButton
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    $isActive={currentPage === page}
                  >
                    {page}
                  </PageButton>
                )
              )}

              <PageButton
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                다음
              </PageButton>
            </Pagination>
          )}

          <ButtonContainer>
            <WriteButton onClick={() => setIsWriting(true)}>
              방명록 남기기
            </WriteButton>
          </ButtonContainer>
        </>
      ) : (
        <GuestbookForm onSubmit={handleSubmit}>
          <Input
            type="text"
            name="author"
            placeholder="이름"
            required
            maxLength={20}
          />
          <TextArea
            name="description"
            placeholder="축하 메시지를 남겨주세요"
            required
            maxLength={200}
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            required
            maxLength={20}
          />
          <ButtonGroup>
            <SubmitButton type="submit">등록하기</SubmitButton>
            <CancelButton type="button" onClick={() => setIsWriting(false)}>
              취소
            </CancelButton>
          </ButtonGroup>
        </GuestbookForm>
      )}
      <Modal
        title={null}
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => {
          setDeleteModalVisible(false);
          setDeletePassword("");
          setSelectedEntryId(null);
        }}
        okText="삭제"
        cancelText="취소"
        closable={false}
      >
        <p style={{ marginBottom: "1rem" }}>
          삭제하려면 비밀번호를 입력하세요.
        </p>
        <AntInput
          type="password"
          value={deletePassword}
          onChange={(e) => setDeletePassword(e.target.value)}
          placeholder="비밀번호"
        />
      </Modal>

      <Modal
        title={null}
        open={deleteModalOpen}
        onOk={() => {
          setDeleteModalOpen(false);
        }}
        closable={false}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={() => setDeleteModalOpen(false)}
          >
            확인
          </Button>,
        ]}
      >
        <p>비밀번호가 일치하지 않거나 삭제에 실패했습니다.</p>
      </Modal>
    </GuestbookContainer>
  );
};

export default Guestbook;

const GuestbookContainer = styled.section`
  padding: 2rem 1rem;
  background-color: #fff;
`;

const GuestbookTitle = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const GuestbookForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 150px;
  resize: none;
`;

const SubmitButton = styled.button`
  padding: 0.8rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #357abd;
  }
`;

const EntriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const EntryItem = styled.div`
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #fafafa;
`;

const EntryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const EntryName = styled.span`
  font-weight: 400;
  color: #333;
  font-size: 1rem;
`;

const EntryDate = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const EntryMessage = styled.p`
  white-space: pre-wrap;
  line-height: 1.5;
  font-size: 1.1rem;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WriteButton = styled.button`
  width: 30%;
  padding: 0.8rem;
  background-color: #4a90e2;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 auto;
  &:hover {
    background-color: #357abd;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const CancelButton = styled(SubmitButton)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #ff4d4f;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem 0;
`;

const PageButton = styled.button<{ $isActive?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${(props) => (props.$isActive ? "#4a90e2" : "#ddd")};
  background-color: ${(props) => (props.$isActive ? "#4a90e2" : "white")};
  color: ${(props) => (props.$isActive ? "white" : "#666")};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#357abd" : "#f5f5f5")};
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #999;
    cursor: not-allowed;
    border-color: #ddd;
  }
`;
