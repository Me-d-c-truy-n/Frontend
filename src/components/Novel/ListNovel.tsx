import { keepPreviousData, useQuery } from "@tanstack/react-query";
import BoxNovel from "../Novel/BoxNovel";
import TitleTab from "../TitleTab";
import { IResponse } from "../../types/response";
import { ApiGetAllNovel } from "../../api/apiNovel";
import { useState } from "react";
import { INovelRoot } from "../../types/novel";
import ListNovelSkeleton from "../Loading/ListNovelSkeleton";
import CustomPagination from "../CustomPagination";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import EmptyResult from "../EmptyResult";

const ListNovel = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [, setPerPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [novels, setNovels] = useState<INovelRoot[]>([]);
  const server = useSelector((state: AppState) => state.server.server);

  const { isLoading, isFetching, isError } = useQuery({
    queryKey: ["all_novel", currentPage, server],
    queryFn: async () => {
      const data: IResponse<INovelRoot[]> = await ApiGetAllNovel(server, currentPage);

      setPerPage(data.perPage);
      setNovels(data.data);
      setTotalPage(data.totalPage);

      return data.data;
    },
    placeholderData: keepPreviousData,
  });

  if (isError)
    return (
      <div>
        <TitleTab name="DANH SÁCH TRUYỆN" link="/" />
        <EmptyResult title="Có vấn đề xảy ra, vui lòng kiểm tra kết nối" />
      </div>
    );

  if (isLoading || isFetching || novels?.length == 0)
    return (
      <ListNovelSkeleton>
        <TitleTab name="Danh Sách Truyện" />
      </ListNovelSkeleton>
    );

  return (
    <div id="pagination-list-novel">
      <TitleTab name="Danh Sách Truyện" />
      <div className="grid grid-cols-1 md:gap-5 gap-3 lg:grid-cols-2">
        {novels.map((novel, idx) => (
          <BoxNovel key={idx} novel={novel} />
        ))}
      </div>
      <CustomPagination
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        topList="pagination-list-novel"
      />
    </div>
  );
};

export default ListNovel;
