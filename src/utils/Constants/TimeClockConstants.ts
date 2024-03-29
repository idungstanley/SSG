export const TIME_TABS = {
  realTime: 'Real Time',
  manual: 'Manual Time',
  clock: 'clock',
  timer: 'timer',
  propertyColumn: 'property_columns',
  nestedEntities: 'nested_entities',
  singleLine: 'single_line_mode',
  compact: 'compact_mode',
  verticalGrid: 'vertical_grid_line',
  singleLabel: 'single_label',
  multiLabel: 'multi_label'
};

export const TIME_ENTITY_SHOW_PROPERTY = [
  { name: 'property columns', value: 'property_columns', sideTag: 'dropDown' },
  { name: 'nested entites', value: 'nested_entities', sideTag: 'dropDown' },
  { name: 'single line mode', value: 'single_line_mode', sideTag: 'switch' },
  { name: 'compact mode', value: 'compact_mode', sideTag: 'switch' },
  { name: 'title vertical grid line', value: 'vertical_grid_line', sideTag: 'switch' },
  { name: 'property vertical grid line', value: 'property_grid_line', sideTag: 'switch' }
];

export const TIME_INVENTORY_HEADER = [
  { name: 'user', value: 'team_member', sorted: false, isHidden: false },
  { name: 'duration', value: 'duration', sorted: false, isHidden: false },
  { name: 'start date', value: 'start_date', sorted: false, isHidden: false },
  { name: 'single label', value: 'single_label', sorted: false, isHidden: false },
  { name: 'end date', value: 'end_date', sorted: false, isHidden: false },
  { name: 'tags', value: 'tags', sorted: false, isHidden: false }
];

export const TIME_LABEL_PROPERTY = [
  { name: 'single label', value: 'single_label' },
  { name: 'multi label', value: 'multi_label' }
];

export const CLOCK_TYPE = [
  { name: 'clock', value: 'clock' },
  { name: 'timer', value: 'timer' },
  { name: 'automatic', value: 'automatic' }
];

export const TIME_INVENTORY_ACTIONS = [
  { name: 'edit', value: 'edit' },
  { name: 'duplicate', value: 'duplicate' },
  { name: 'delete', value: 'delete' }
];

export const TIME_INVENTORY_CUSTOM_PROPERTIES = [
  { name: 'map', value: 'map' },
  { name: 'community', value: 'community' },
  { name: 'progress', value: 'progress' },
  { name: 'text', value: 'text' },
  { name: 'labels', value: 'labels' },
  { name: 'boolean', value: 'boolean' },
  { name: 'formulas', value: 'formulas' },
  { name: 'attachment', value: 'attachment' },
  { name: 'id generator', value: 'id_generator' },
  { name: 'date', value: 'date' },
  { name: 'rating', value: 'rating' },
  { name: 'currency', value: 'currency' },
  { name: 'contacts', value: 'contacts' }
];
