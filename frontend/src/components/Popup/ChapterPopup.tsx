import { GrClose } from "react-icons/gr";
import { IChapterRoot } from "../../types/novel";
import ChapterRow from "./ChapterRow";
import { useQuery } from "@tanstack/react-query";
import { IResponse } from "../../types/response";
import { ApiGetAllChapter } from "../../api/apiNovel";
import { useState } from "react";
import ListChapterSkeleton from "../Loading/ListChapterSkeleton";
import CustomPagination from "../CustomPagination";

interface Props {
  close: ()=>void;
  novelId: string;
  name: string;
}

const ChapterPopup = ({ close, novelId, name }: Props) => {
  const [chapters, setChapters] = useState<IChapterRoot[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [, setPerPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);

  const { isFetching } = useQuery({
    queryKey: ['all_chapter', novelId, currentPage],
    queryFn: async () => {
      const data: IResponse<IChapterRoot[]> = await ApiGetAllChapter('truyenfull', novelId, currentPage);

      setPerPage(data.perPage);
      setTotalPage(data.totalPage);
      setChapters(data.data);

      return data;
    },
  })

  return (
    <div className="fixed left-0 mt-0 z-10 top-0 w-full h-screen bg-gray-400 overflow-y-scroll px-2">
      <div className="shadow-2xl p-2 lg:w-8/12 lg:p-4 mx-auto border rounded-lg border-amber-600 bg-amber-50 pb-5"
      >
        {
          (isFetching ||chapters.length<=0) ?<ListChapterSkeleton name={name} close={close}/>:(
            <>
              <div className='flex justify-between items-center mb-10 border-b pb-6'>
                <h1 className='text-xl font-bold'>{chapters[0].novelName}</h1>
                <GrClose className='text-xl cursor-pointer text-gray-500 hover:text-black' onClick={close}/>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {
                  chapters.map(chapter => 
                  <ChapterRow 
                    key={chapter.chapterId} 
                    chapter={chapter} 
                    close={close}/>)
                }
              </div>

              <CustomPagination
                  totalPage={totalPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
              />
            </>
          )
        }
      </div>
    </div>
  )
}

export default ChapterPopup