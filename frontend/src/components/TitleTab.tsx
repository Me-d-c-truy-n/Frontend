import { Link } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const TitleTab = ({ name, link}: {name: string, link: string}) => {
  return (
    <Link to={link} className="dark:bg-slate-900 p-2 flex items-center justify-between mb-6">
        <h2 className="text-xl text-amber-700">{name}</h2>
          <MdOutlineKeyboardDoubleArrowRight  className="text-amber-700 text-xl"/>
    </Link>
  )
}

export default TitleTab