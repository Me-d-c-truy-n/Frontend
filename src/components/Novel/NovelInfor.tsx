import { Link, useNavigate } from "react-router-dom";
import { INovelRoot } from "../../types/novel";
import ButtonUtils from "../Button/ButtonUtils";

import { FiBookOpen } from "react-icons/fi";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { GrNext } from "react-icons/gr";
import { HiUser } from "react-icons/hi2";
import { FiDownload } from "react-icons/fi";

import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import ChapterPopup from "../Popup/ChapterPopup";
import ButtonBookmark from "../Button/ButtonBookmark";
import { getChapterJustReaded } from "../../store/history/selector";
import { useSelector } from "react-redux";

import CustomImageAsBook from "./CustomImageAsBook";
import ExportEBookPopup from "../Popup/ExportEBookPopup";

interface Props {
  novel: INovelRoot | null;
  isLoading?: boolean;
  server: string;
}

const NovelInfor = ({ novel, isLoading = false, server }: Props) => {
  const navigate = useNavigate();
  const [openChapterPopup, setOpenChapterPopup] = useState<boolean>(false);
  const [openExportEBook, setOpenExportEBook] = useState<boolean>(false);

  const chapterId = useSelector(getChapterJustReaded(novel?.novelId));

  if (isLoading || novel == null)
    return (
      <div className="flex gap-6 my-6 flex-col md:flex-row items-center">
        <div>
          <Skeleton className="h-64 w-48" />
        </div>
        <div className="flex flex-col min-w-48">
          <div className="font-bold text-xl mb-3 text-gray-700">
            <Skeleton />
          </div>
          <Skeleton />
        </div>
      </div>
    );

  return (
    <div className="flex gap-4 my-6 flex-col md:flex-row items-center md:items-start">
      {openExportEBook && (
        <ExportEBookPopup
          close={() => setOpenExportEBook(false)}
          novelId={novel.novelId}
          server={server}
          chapterId={novel.firstChapter}
        />
      )}
      {openChapterPopup && (
        <ChapterPopup
          close={() => setOpenChapterPopup(false)}
          novelId={novel.novelId + ""}
          name={novel.name}
          server={server}
          chapterId={chapterId || "1"}
        />
      )}

      <CustomImageAsBook image={novel.image} name={novel.name} />

      <div className="md:ml-5 ml-1 flex flex-col flex-1 rounded">
        <div className="font-bold text-xl md:text-3xl md:mb-3 mb-1 text-gray-700 dark:text-white w-fit">
          {novel.name}
        </div>
        <Link
          to={`/tac-gia/${novel.author.authorId || novel.author.id}?server=${server}`}
          className="text-base dark:text-slate-400 text-slate-600 flex gap-1 items-center hover:underline w-fit"
        >
          <HiUser />
          {novel.author.name}
        </Link>
        <div className="flex lg:gap-5 gap-2 md:mt-5 mt-3 flex-wrap justify-center md:justify-start">
          <ButtonUtils func={() => navigate(`/truyen/${novel.novelId}/${novel.firstChapter}`)} de={false}>
            <FiBookOpen />
            Đọc Truyện
          </ButtonUtils>
          <ButtonBookmark novelId={novel.novelId} novelName={novel.name} time={new Date().toString()} />

          <ButtonUtils func={() => setOpenChapterPopup(true)}>
            <MdOutlineFormatListBulleted />
            Mục lục
          </ButtonUtils>

          <ButtonUtils func={() => setOpenExportEBook(true)}>
            <FiDownload />
            Tải truyện
          </ButtonUtils>

          {chapterId && chapterId != "0" && (
            <ButtonUtils
              func={() => navigate(`/truyen/${novel.novelId}/${chapterId}`)}
              className="bg-red-600 text-white border-none shadow hover:text-white"
            >
              Đọc Tiếp
              <GrNext />
            </ButtonUtils>
          )}
        </div>
      </div>
    </div>
  );
};

export default NovelInfor;
