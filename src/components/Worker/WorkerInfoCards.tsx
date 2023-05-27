import { useState, useMemo } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import style from "../../styles/Worker/WorkerInfoCards.module.scss";
import { ReactComponent as CopyIcon } from "../../assets/copy.svg";
import { ReactComponent as DropdownIcon } from "../../assets/dropdown.svg";
import { ReactComponent as DropupIcon } from "../../assets/dropup.svg";
import AllowanceItem from "./AllowanceItem";
import useInput from "../../hooks/useInput";
import OverTimePayItem from "./OverTimePayItem";
import NightTimePayItem from "./NightTimePayItem";
import { IWORKER_DATA } from "../WrokRoom/WorkRoomDetail";


const WorkerInfoCards: React.FC<IWORKER_DATA> = ({id, accountNumber, age, bank, gender, name, phoneNumber, wage}) => {
  const formattedPhoneNumber = useMemo(() => phoneNumber ? phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"): "", [phoneNumber]);
  const formattedGender = useMemo(() => (gender === "female" ? "여" : "남"), [gender]);

  const [isSalaryToggle, setIsSalaryToggle] = useState(false);
  const [weeklyInclude, setWeeklyInclude] = useState(false);
  const [overtimeInclude, setOvertimeInclude] = useState(false);
  const [nightInclude, setNightInclude] = useState(false);

  const [overHourTime, setOverHourTime] = useState(false);
  const [overHourTimeValue, setOverHourTimeValue] = useState("00");
  const [overMinuteTime, setOverMinuteTime] = useState(false);
  const [overMinuteTimeValue, setOverMinuteTimeValue] = useState("00");

  const startTime = useInput("");
  const endTime = useInput("");

  const onNightPaytimeBlur = () => {
    console.log(startTime.value, endTime.value);
  };

  const handleOverTimeHourClick = (index: number) => {
    const newValue = String(index + 1).padStart(2, "0");
    setOverHourTimeValue(newValue);
    setOverHourTime(false);
  };
  const handleOverTimeMinuteClick = (value: number) => {
    const newValue = String(value).padStart(2, "0");
    setOverMinuteTimeValue(newValue);
    setOverMinuteTime(false);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    switch (name) {
      case "weekly-allowance":
        setWeeklyInclude(value === "include");
        break;
      case "overtime-pay":
        setOvertimeInclude(value === "include");
        break;
      case "night-allowance":
        setNightInclude(value === "include");
        break;
      default:
        break;
    }
  };

  return (
    <div className={style["worker-info-cards"]}>
      <div className={style["pay-card"]}>
        <h3>03월 급여액</h3>
        <p>
          <span>120,000</span>원
        </p>
      </div>
      <div className={style["worker-bank-info-card"]}>
        <div className={style["worker-info"]}>
          <span>{name}</span>
          <span>{formattedGender}</span>
          <span>{age}</span>
          <p>{formattedPhoneNumber}</p>
          <p>{bank} {accountNumber}</p>
        </div>
        <div className={style["worker-bank-copy"]}>
          <CopyToClipboard
            text={""}
            onCopy={() => alert(`${name} / ${bank} ${accountNumber} / 120,000`)}
          >
            <button>
              <CopyIcon />
              입금복사
            </button>
          </CopyToClipboard>
        </div>
      </div>
      <div className={style["salary-calculator"]}>
        <div
          className={style["salary-btn"]}
          onClick={() => setIsSalaryToggle(!isSalaryToggle)}
        >
          급여상세 설정
          {isSalaryToggle ? <DropupIcon /> : <DropdownIcon />}
        </div>
        {isSalaryToggle && (
          <div className={style["allowance-content"]}>
            <AllowanceItem
              label={"주휴수당"}
              name={"weekly-allowance"}
              handleRadioChange={handleRadioChange}
              include={weeklyInclude}
            >
              <p>(1주일 총 일한시간 / 40시간) x 8 x 시급</p>
            </AllowanceItem>
            <AllowanceItem
              label={"연장수당"}
              name={"overtime-pay"}
              handleRadioChange={handleRadioChange}
              include={overtimeInclude}
            >
              <OverTimePayItem
                overHourTime={overHourTime}
                overMinuteTime={overMinuteTime}
                setOverHourTime={setOverHourTime}
                overHourTimeValue={overHourTimeValue}
                handleOverTimeHourClick={handleOverTimeHourClick}
                setOverMinuteTime={setOverMinuteTime}
                overMinuteTimeValue={overMinuteTimeValue}
                handleOverTimeMinuteClick={handleOverTimeMinuteClick}
              />
            </AllowanceItem>
            <AllowanceItem
              label={"야간수당"}
              name={"night-allowance"}
              handleRadioChange={handleRadioChange}
              include={nightInclude}
            >
              <NightTimePayItem
                startTime={startTime}
                endTime={endTime}
                onNightPaytimeBlur={onNightPaytimeBlur}
              />
            </AllowanceItem>
            <p>
              *실제로 설정된 근무 정보가 바뀌지 않습니다. 급여 계산할 때
              유용합니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerInfoCards;
