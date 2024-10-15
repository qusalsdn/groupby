import { faCalendarPlus, faCampground } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  return (
    <div>
      <nav className="flex items-center justify-between">
        <div>
          <FontAwesomeIcon icon={faCampground} className="w-12 h-12 text-green-500" />
          <p>GroupBy</p>
        </div>

        <FontAwesomeIcon icon={faCalendarPlus} className="w-6 h-6" />
      </nav>
    </div>
  );
}
