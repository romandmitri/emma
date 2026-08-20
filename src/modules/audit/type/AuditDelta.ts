// Arbitrary string for comparing multiple objects.
// Use this because JSON.stringify() does NOT guarantee order
// and might include unnecessary data (ie: functions).
export type AuditDelta = string;

type DeltaInterface = {
	toDelta: () => AuditDelta;
};

export const isDelta = <T extends DeltaInterface>(a: T | undefined, b: T | undefined): boolean => {
	if (!a && !b) return false;
	if (!a || !b) return true;
	return a.toDelta() != b.toDelta();
};

type DeltaPart = string | number | null | undefined;

export const joinDelta = (parts: DeltaPart[]): AuditDelta => {
	return parts.join("\n");
};
