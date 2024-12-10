import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Calendar = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const weddingDate = new Date('2025-11-09T13:00:00');
  const today = new Date();
  const diffTime = Math.abs(weddingDate.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <Section ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <CalendarWrapper>
          <MonthYear>NOVEMBER 2025</MonthYear>
          <DaysGrid>
            <WeekDays>
              <Day>SUN</Day>
              <Day>MON</Day>
              <Day>TUE</Day>
              <Day>WED</Day>
              <Day>THU</Day>
              <Day>FRI</Day>
              <Day>SAT</Day>
            </WeekDays>
            <Dates>
              <EmptyDay />
              <EmptyDay />
              <EmptyDay />
              <EmptyDay />
              <EmptyDay />
              <EmptyDay />
              <DateCell>1</DateCell>
              <DateCell>2</DateCell>
              <DateCell>3</DateCell>
              <DateCell>4</DateCell>
              <DateCell>5</DateCell>
              <DateCell>6</DateCell>
              <DateCell>7</DateCell>
              <DateCell>8</DateCell>
              <DateCell $isWeddingDay>9</DateCell>
              <DateCell>10</DateCell>
              <DateCell>11</DateCell>
              <DateCell>12</DateCell>
              <DateCell>13</DateCell>
              <DateCell>14</DateCell>
              <DateCell>15</DateCell>
              <DateCell>16</DateCell>
              <DateCell>17</DateCell>
              <DateCell>18</DateCell>
              <DateCell>19</DateCell>
              <DateCell>20</DateCell>
              <DateCell>21</DateCell>
              <DateCell>22</DateCell>
              <DateCell>23</DateCell>
              <DateCell>24</DateCell>
              <DateCell>25</DateCell>
              <DateCell>26</DateCell>
              <DateCell>27</DateCell>
              <DateCell>28</DateCell>
              <DateCell>29</DateCell>
              <DateCell>30</DateCell>
            </Dates>
          </DaysGrid>
        </CalendarWrapper>

        <DDay>
          <span>우리의 결혼식이</span>
          <strong>{diffDays}일</strong> 
          <span>남았습니다</span>
        </DDay>

        <TimeLocation>
          <Time>
            2025년 11월 9일 일요일 오후 1시
          </Time>
          <Location>
            W웨딩 더에스웨딩홀
          </Location>
        </TimeLocation>
      </motion.div>
    </Section>
  );
};

const Section = styled.section`
  padding: 60px 16px;
  background-color: #f9f9f9;
  text-align: center;
`;

const CalendarWrapper = styled.div`
  max-width: 340px;
  margin: 0 auto;
  background-color: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const MonthYear = styled.h2`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 16px;
  color: #333;
`;

const DaysGrid = styled.div`
  width: 100%;
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 10px;
`;

const Day = styled.div`
  font-size: 0.8rem;
  color: #666;
  padding: 5px;
`;

const Dates = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const EmptyDay = styled.div`
  padding: 10px;
`;

const DateCell = styled.div<{ $isWeddingDay?: boolean }>`
  padding: 8px;
  font-size: 0.9rem;
  ${({ $isWeddingDay }) => $isWeddingDay && `
    background-color: #FF9999;
    color: white;
    border-radius: 50%;
    font-weight: bold;
  `}
`;

const DDay = styled.div`
  margin: 32px 0;
  font-size: 1.1rem;
  line-height: 1.6;
  
  strong {
    font-size: 1.6rem;
    color: #FF9999;
    margin: 0 8px;
    font-weight: 700;
  }
`;

const TimeLocation = styled.div`
  margin-top: 24px;
  line-height: 1.6;
`;

const Time = styled.p`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 8px;
`;

const Location = styled.p`
  font-size: 1rem;
  color: #666;
`;

export default Calendar; 