import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to get top level fields from nested field names
export const getTopLevelFields = (fieldNames: string[]): string[] => {
  const topLevelFields = new Set<string>();
  fieldNames.forEach((fieldName) => {
    const topLevel = fieldName.split('.')[0];
    topLevelFields.add(topLevel);
  });
  return Array.from(topLevelFields);
};

// Helper function to get step values from nested field names
export const getStepValues = (
  fieldNames: string[],
  allValues: Record<string, unknown>
): Record<string, unknown> => {
  const stepValues: Record<string, unknown> = {};
  fieldNames.forEach((name) => {
    const value = name
      .split('.')
      .reduce(
        (obj, key) => (obj ? (obj as Record<string, unknown>)[key] : undefined),
        allValues
      );

    // Set nested value in stepValues
    const path = name.split('.');
    let current = stepValues;
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      }
      current = current[path[i]] as Record<string, unknown>;
    }
    current[path[path.length - 1]] = value;
  });
  return stepValues;
};

// Helper function to validate step
export const validationStep = (
  stepSchema: unknown,
  stepValues: Record<string, unknown>
) => {
  if (
    typeof stepSchema === 'object' &&
    stepSchema !== null &&
    'safeParse' in stepSchema
  ) {
    return (stepSchema as { safeParse: (data: unknown) => unknown }).safeParse(
      stepValues
    );
  }
  return { success: false, error: { errors: [] } };
};
