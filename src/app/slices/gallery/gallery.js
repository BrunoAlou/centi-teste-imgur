import { createSlice } from '@reduxjs/toolkit';
import { original } from 'immer';

export const SECTION_DEFAULT = 'user';
const SORT_DEFAULT = 'viral';
const WINDOW_DEFAULT = 'week';
const AMOUNT_DEFAULT = 'veryMany';
const DYNAMIC_DEFAULT = false;


export const initialState = {
	galleryParams: {
		queryParams: {
			album_previews: true
		},
		keyValues: {
			section: SECTION_DEFAULT,
			sort: {
				value: SORT_DEFAULT,
				disabled: false
			},
			window: WINDOW_DEFAULT,
			page: 0,
			amount: AMOUNT_DEFAULT,
			dinamicHeight: DYNAMIC_DEFAULT,
		}
	}
};

const gallerySlice = createSlice({
	name: 'gallery',
	initialState,
	reducers: {
		galleryFilters: (state, { payload }) => {
			const gParams = original(state.galleryParams);
			state.galleryParams = {
				...gParams,
				queryParams: {
					...gParams.queryParams,
				},
				keyValues: {
					...gParams.keyValues,
					section: payload.section,
					sort: {
						value: payload.sort.value,
						disabled: payload.section !== SECTION_DEFAULT
					},
					window: payload.window,
					amount: payload.amount,
					dinamicHeight: payload.dinamicHeight, 
				}
			};
		},
		galleryNextPage: (state) => {
			const gParams = original(state.galleryParams);
			state.galleryParams = {
				...gParams,
				keyValues: {
					...gParams.keyValues,
					page: gParams.keyValues.page + 1
				}
			};
		},
		galleryReset: () => initialState
	}
});

export const { galleryNextPage, galleryFilters, galleryReset } = gallerySlice.actions;

export const gallerySelector = (state) => state['gallery'];

export default gallerySlice.reducer;
