export type ActionSuccess<Data> = {
	success: true;
	data: Data;
};
export type ActionError = {
	success: false;
	error: string;
};

export type ActionResponse<Data = void> = ActionSuccess<Data> | ActionError;

export const actSuccess = <Data = void>(data: Data): ActionSuccess<Data> => {
	return {
		success: true,
		data: data,
	};
};

export const actFail = (error: string): ActionError => {
	return {
		success: false,
		error: error,
	};
};
