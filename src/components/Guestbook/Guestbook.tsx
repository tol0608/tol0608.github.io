import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface GuestbookEntry {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
}

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api/guestbook"
    : "/api/guestbook";

const Guestbook = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEntries(data);
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
        }),
      });

      if (response.ok) {
        form.reset();
        setIsWriting(false);
        fetchEntries();
      }
    } catch (error) {
      console.error("방명록 작성에 실패했습니다:", error);
    }
  };

  return (
    <GuestbookContainer>
      <GuestbookTitle>방명록</GuestbookTitle>

      {!isWriting ? (
        <>
          <EntriesList>
            {entries.map((entry) => (
              <EntryItem key={entry._id}>
                <EntryHeader>
                  <EntryName>{entry.name}</EntryName>
                  <EntryDate>
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </EntryDate>
                </EntryHeader>
                <EntryMessage>{entry.message}</EntryMessage>
              </EntryItem>
            ))}
          </EntriesList>
          <WriteButton onClick={() => setIsWriting(true)}>
            방명록 남기기
          </WriteButton>
        </>
      ) : (
        <GuestbookForm onSubmit={handleSubmit}>
          <Input type="text" name="name" placeholder="이름" required />
          <TextArea
            name="message"
            placeholder="축하 메시지를 남겨주세요"
            required
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
