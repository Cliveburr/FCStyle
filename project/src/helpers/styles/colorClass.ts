
import { ClassBuilderDef, ifBy, ifSet } from "./classBuilder";

export interface ColorSet {
  variant?: 'white' | 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'success' | 'warning' | 'danger';
  inverse?: boolean;
  hoverable?: boolean;
  selected?: boolean;
}

export interface ColorShortcuts {
  // Color set
  colorSet?: ColorSet;
  
  // Numeric color shortcuts
  white?: boolean;
  one?: boolean;
  two?: boolean;
  three?: boolean;
  four?: boolean;
  five?: boolean;
  six?: boolean;
  seven?: boolean;
  white_inv?: boolean;
  one_inv?: boolean;
  two_inv?: boolean;
  three_inv?: boolean;
  four_inv?: boolean;
  five_inv?: boolean;
  six_inv?: boolean;
  seven_inv?: boolean;
  
  // Semantic color shortcuts
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  success_inv?: boolean;
  warning_inv?: boolean;
  danger_inv?: boolean;
  
  // State shortcuts
  hoverable?: boolean;
  selected?: boolean;
}

// Helper function for generating color classes
const generateColorClass = (variant: string, inverse?: boolean, hoverable?: boolean, selected?: boolean): string => {
  const classes: string[] = [inverse ? `${variant}-inv` : variant];
  
  if (hoverable) {
    classes.push('hoverable');
  }
  
  if (selected) {
    classes.push('selected');
  }
  
  return classes.join(' ');
};

export const ColorBuilder: ClassBuilderDef<ColorSet> = {
  props: {
    'color': ifBy,
    // Numeric colors
  'white': ifSet({ variant: 'white' }),
  'one': ifSet({ variant: 'one' }),
  'two': ifSet({ variant: 'two' }),
  'three': ifSet({ variant: 'three' }),
  'four': ifSet({ variant: 'four' }),
  'five': ifSet({ variant: 'five' }),
  'six': ifSet({ variant: 'six' }),
  'seven': ifSet({ variant: 'seven' }),
  'white_inv': ifSet({ variant: 'white', inverse: true }),
  'one_inv': ifSet({ variant: 'one', inverse: true }),
  'two_inv': ifSet({ variant: 'two', inverse: true }),
  'three_inv': ifSet({ variant: 'three', inverse: true }),
  'four_inv': ifSet({ variant: 'four', inverse: true }),
  'five_inv': ifSet({ variant: 'five', inverse: true }),
  'six_inv': ifSet({ variant: 'six', inverse: true }),
  'seven_inv': ifSet({ variant: 'seven', inverse: true }),
    // Semantic colors
  'success': ifSet({ variant: 'success' }),
  'warning': ifSet({ variant: 'warning' }),
  'danger': ifSet({ variant: 'danger' }),
  'success_inv': ifSet({ variant: 'success', inverse: true }),
  'warning_inv': ifSet({ variant: 'warning', inverse: true }),
  'danger_inv': ifSet({ variant: 'danger', inverse: true }),
    // States
    'hoverable': ifSet({ hoverable: true }),
    'selected': ifSet({ selected: true })
  },
  process: (sets: ColorSet[]): string => {
    const mergedProps: ColorSet = {};
    
    // Loop pelos sets e merge das propriedades (última sobrescreve)
    for (const colorSet of sets) {
      Object.assign(mergedProps, colorSet);
    }

    if (mergedProps.variant) {
      return generateColorClass(mergedProps.variant, mergedProps.inverse, mergedProps.hoverable, mergedProps.selected);
    }

    const classes: string[] = [];
    
  // Se não há variant mas há states, adiciona apenas os states
    if (mergedProps.hoverable) {
      classes.push('hoverable');
    }
    
    if (mergedProps.selected) {
      classes.push('selected');
    }

    return classes.join(' ');
  }
};
