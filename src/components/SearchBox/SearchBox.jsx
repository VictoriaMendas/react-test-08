import { useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";
import { useDispatch } from "react-redux";

export default function SearchBox() {
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const onChangeFilter = (evt) => {
    const inputValue = evt.target.value;
    dispatch(changeFilter(inputValue));
  };
  return (
    <div>
      <label>
        Find contact by name
        <input type="text" value={filter} onChange={onChangeFilter} />
      </label>
    </div>
  );
}
