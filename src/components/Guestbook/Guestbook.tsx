import React, { useState, useEffect } from "react";
import styled from "styled-components";
interface GuestbookEntry {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
}

const API_URL = import.meta.env.VITE_NODE_ENV === 'production'
  ? import.meta.env.VITE_API_URL
  : 'http://localhost:5005/api/guestbook';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

const ITEMS_PER_PAGE = 5; // 페이지당 표시할 항목 수

const Guestbook = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

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
      const sortedData = data.sort((a: GuestbookEntry, b: GuestbookEntry) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setEntries(sortedData);
      console.log('방명록 불러오기 성공', sortedData, response, data);
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
          name: formData.get("name"),
          message: formData.get("message"),
          createdAt: new Date().toISOString()
        }),
      });

      if (response.ok) {
        form.reset();
        setIsWriting(false);
        fetchEntries();
      } else {
        throw new Error('방명록 작성에 실패했습니다');
      }
      console.log('방명록 작성 성공');
    } catch (error) {
      console.error("방명록 작성에 실패했습니다:", error);
      alert('방명록 작성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <GuestbookContainer>
      <GuestbookTitle>방명록</GuestbookTitle>

      {!isWriting ? (
        <>
          <EntriesList>
            {currentEntries.map((entry) => (
              <EntryItem key={entry._id}>
                <EntryHeader>
                  <EntryName>{entry.name}</EntryName>
                  <EntryDate>{formatDate(entry.createdAt)}</EntryDate>
                </EntryHeader>
                <EntryMessage>{entry.message}</EntryMessage>
              </EntryItem>
            ))}
          </EntriesList>

          {totalPages > 1 && (
            <Pagination>
              <PageButton 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                이전
              </PageButton>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PageButton
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  $isActive={currentPage === page}
                >
                  {page}
                </PageButton>
              ))}
              
              <PageButton
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                다음
              </PageButton>
            </Pagination>
          )}

          <WriteButton onClick={() => setIsWriting(true)}>
            방명록 남기기
          </WriteButton>
        </>
      ) : (
        <GuestbookForm onSubmit={handleSubmit}>
          <Input 
            type="text" 
            name="name" 
            placeholder="이름" 
            required 
            maxLength={20}
          />
          <TextArea
            name="message"
            placeholder="축하 메시지를 남겨주세요"
            required
            maxLength={200}
          />
          <ButtonGroup>
            <SubmitButton type="submit">등록하기</SubmitButton>
            <CancelButton type="button" onClick={() => setIsWriting(false)}>
              취소
            </CancelButton>
          </ButtonGroup>
        </GuestbookForm>
      )}
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
  min-height: 100px;
  resize: vertical;
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
  font-weight: 500;
`;

const EntryDate = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const EntryMessage = styled.p`
  white-space: pre-wrap;
  line-height: 1.5;
`;

const WriteButton = styled.button`
  width: 100%;
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem 0;
`;

const PageButton = styled.button<{ $isActive?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.$isActive ? '#4a90e2' : '#ddd'};
  background-color: ${props => props.$isActive ? '#4a90e2' : 'white'};
  color: ${props => props.$isActive ? 'white' : '#666'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.$isActive ? '#357abd' : '#f5f5f5'};
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #999;
    cursor: not-allowed;
    border-color: #ddd;
  }
`;
