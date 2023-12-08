// Validate array
export function isValidArray(arr) {
	return Array.isArray(arr) && arr.length > 0;
}
// Validate object
export function isValidObject(obj) {
	return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}