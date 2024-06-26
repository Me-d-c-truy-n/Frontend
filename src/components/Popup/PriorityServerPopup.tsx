import { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../store";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import ButtonClose from "../Button/ButtonClose";
import { changeServerIndex } from "../../store/server";
import { toast } from "react-toastify";
import { FaInfoCircle } from "react-icons/fa";
import useGetListServerPopup from "../../hooks/query/useGetListServerPopup";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  close: () => void;
}

const PriorityServerPopup = ({ close }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useGetListServerPopup();
  const listServer = useSelector((state: AppState) => state.server.listServer);
  const [stores, setStores] = useState(listServer);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  useEffect(() => {
    setStores(listServer);
  }, [listServer]);

  const { modalRef, handleClickOutside } = useModal(close);

  const handleDragDrop = (results: DropResult) => {
    const { source, destination, type } = results;
    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    if (type === "group") {
      const tmpStores = [...stores];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedStore] = tmpStores.splice(sourceIndex, 1);
      tmpStores.splice(destinationIndex, 0, removedStore);

      return setStores(tmpStores);
    }
  };

  const handleSaveNewPriority = () => {
    if (stores.length > 0) {
      dispatch(changeServerIndex(stores));
      toast.success("Đã cập nhật độ ưu tiên nguồn truyện");
    }
    close();
  };

  return (
    <div
      ref={modalRef}
      onClick={handleClickOutside}
      className="fixed flex justify-center items-center left-0 mt-0 z-[1000] top-0 w-full h-screen px-2"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <div className="shadow-2xl p-2 mx-auto border rounded-lg border-amber-600 bg-amber-50 dark:bg-stone-950 w-fit">
        <div className="flex justify-between items-center border-b shadow-sm pb-3 md:px-2 px-1 dark:border-b-gray-800">
          <h1 className="text-lg md:text-xl mr-5 font-bold dark:text-white">Thay đổi độ ưu tiên</h1>
          <ButtonClose close={close} />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center mt-2">
            <CircularProgress />
          </div>
        ) : (
          <div className="border border-slate-400 p-2 px-3 rounded">
            <DragDropContext onDragEnd={handleDragDrop}>
              <div className="md:mt-2 flex gap-1 flex-col text-white md:text-base text-sm mb-1">
                <Droppable droppableId="ROOT" type="group">
                  {(provided) => (
                    <div className="flex gap-1 flex-col" {...provided.droppableProps} ref={provided.innerRef}>
                      {stores.map((srv, index) => (
                        <Draggable draggableId={srv} key={srv} index={index}>
                          {(provided) => (
                            <div
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              className="border border-slate-800 dark:border-slate-50 text-white rounded px-10 py-2 mb-0.5 text-center bg-amber-500 hover:bg-amber-500/90 md:text-lg text-base"
                            >
                              {srv}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </DragDropContext>
            {stores.length <= 0 && (
              <div className="text-red-600 font-bold text-center text-xl mb-2 ">Không có nguồn truyện nào</div>
            )}
            <i className="md:text-base w-full flex flex-wrap font-semibold text-sky-500 items-center justify-center text-sm gap-1">
              <FaInfoCircle />
              Kéo thả để thay đổi độ ưu tiên
            </i>
          </div>
        )}

        <div className="flex mt-5 gap-3 justify-around pb-1">
          <button
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-8 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={close}
          >
            Hủy
          </button>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSaveNewPriority}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriorityServerPopup;
