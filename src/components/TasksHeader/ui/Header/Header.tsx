import { Assignee } from '../Assignee/Assignee';
import { ChangeView } from '../ChangeView/ChangeView';
import { FilterDropdown } from '../Filter/FilterDropdown';
import { Search } from '../Search/Search';
import { Sort } from '../Sort/Sort';

export function Header() {
  return (
    <section className="p-1.5 h-12 w-full flex items-center justify-between space-x-3 border-b">
      <ChangeView />

      <div className="flex space-x-3 items-center">
        <Sort />
        <FilterDropdown />
        <Assignee />
        <Search />
      </div>
    </section>
  );
}
