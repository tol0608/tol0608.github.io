import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Modal } from "antd";

interface AccountInfo {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  relation: string;
}

const Account = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const accounts: AccountInfo[] = [
    {
      bankName: "부산은행",
      accountNumber: "112-2039-7904-03",
      accountHolder: "이재현",
      relation: "신랑",
    },
    {
      bankName: "카카오뱅크",
      accountNumber: "3333-07-9843576",
      accountHolder: "허정현",
      relation: "신부",
    },
  ];

  const handleCopyAccount = (account: string) => {
    navigator.clipboard.writeText(account);
    Modal.success({
      content: "계좌번호를 클립보드에 복사하였습니다.",
    });
  };

  return (
    <Section ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Title>마음을 전하실 곳</Title>

        <AccountList>
          {accounts.map((account, index) => (
            <AccountItem key={index}>
              <AccountHeader>
                <Relation>{account.relation}</Relation>
                <Name>{account.accountHolder}</Name>
              </AccountHeader>
              <BankInfo>
                <BankName>{account.bankName}</BankName>
                <AccountNumber>
                  {account.accountNumber}
                  <CopyButton
                    onClick={() => handleCopyAccount(account.accountNumber)}
                    aria-label="계좌번호 복사"
                  >
                    <ContentCopyIcon sx={{ fontSize: 16 }} />
                  </CopyButton>
                </AccountNumber>
              </BankInfo>
            </AccountItem>
          ))}
        </AccountList>

        <Notice>
          참석이 어려우신 분들을 위해
          <br />
          계좌번호를 기재하였습니다.
        </Notice>
      </motion.div>
    </Section>
  );
};

const Section = styled.section`
  padding: 80px 20px;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 40px;
`;

const AccountList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  margin: 0 auto;
`;

const AccountItem = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const AccountHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const Relation = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const Name = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
`;

const BankInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BankName = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const AccountNumber = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  color: #333;
`;

const CopyButton = styled.button`
  border: none;
  background: none;
  padding: 4px;
  color: #999;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #666;
  }
`;

const Notice = styled.p`
  text-align: center;
  margin-top: 40px;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
`;

export default Account;
