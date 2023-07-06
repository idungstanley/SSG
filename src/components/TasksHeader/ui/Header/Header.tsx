import { useAppSelector } from '../../../../app/hooks';
import TaskMenu from '../../../../pages/workspace/tasks/component/taskMenu/TaskMenu';
import { Assignee } from '../Assignee/Assignee';
import { ChangeView } from '../ChangeView/ChangeView';
import { FilterDropdown } from '../Filter/FilterDropdown';
import { Search } from '../Search/Search';
import { Sort } from '../Sort/Sort';

export function Header() {
  const { showTaskNavigation } = useAppSelector((state) => state.task);

  return (
    <>
      {showTaskNavigation && (
        <div className="w-full p-2 absolute z-50">
          <span className="w-12/12 transition duration-300 ease-in-out ">
            <TaskMenu />
          </span>
        </div>
      )}
      <section className="p-1.5 h-12 w-full flex items-center justify-between border-b">
        <ChangeView />

        <div className="flex items-center justify-end">
          <Sort />
          <FilterDropdown />
          <Assignee />
          <Search />
        </div>
      </section>
    </>
  );
}
