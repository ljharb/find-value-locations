declare namespace findValueLocation {
	type ValueLocation = [
		object,
		PropertyKey,
		PropertyDescriptor,
	];
}

declare function findValueLocation(obj: {}, value?: unknown): findValueLocation.ValueLocation[];

export = findValueLocation;
