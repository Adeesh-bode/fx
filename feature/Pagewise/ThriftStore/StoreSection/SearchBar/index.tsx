import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import styles from "../styles/searchbar.module.scss";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onToggleFilter: () => void;
}

const SearchBar = ({ searchQuery, setSearchQuery, onToggleFilter }: SearchBarProps) => (
  <div className={styles.searchBar}>
    <Button
      variant="outline"
      size="icon"
      onClick={onToggleFilter}
      className={styles.filterButton}
    >
      <Filter className="h-4 w-4" />
    </Button>

    <div className={styles.inputWrapper}>
      <Search className={styles.searchIcon} />
      <Input
        placeholder="Search products..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className={styles.input}
      />
    </div>
  </div>
);

export default SearchBar;
