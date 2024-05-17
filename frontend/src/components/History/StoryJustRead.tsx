import TitleTab from "../TitleTab";
import StoryHistoryRow from "./StoryHistoryRow";
import { useSelector } from "react-redux";
import { AppState } from "../../store";

const StoryJustRead = ({ isShowAll }: {isShowAll: boolean}) => {
  const history = useSelector((state: AppState) => state.history.history);

  return (
      <div className="mb-10 mt-2">
        {
          !isShowAll && history.length > 0 &&
        <TitleTab name="TRUYỆN VỪA ĐỌC" link="/tu-truyen"/>
        }
        {
          history.map((hs,idx) =>
            isShowAll?(
              <StoryHistoryRow 
                key={idx}
                data={hs}
                color={idx%2==1}
              />
            ):(
              idx<5?
              <StoryHistoryRow 
                key={idx}
                data={hs}
                color={idx%2==1}
              />:(<span key={idx} style={{visibility:'hidden'}} hidden></span>)
            )
          )
        }
      </div>
  )
}

export default StoryJustRead