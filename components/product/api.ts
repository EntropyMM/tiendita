import axios from "axios"
import Papa from "papaparse"

import { Product } from "./types"

export default {
	list: async (): Promise<Product[]> => {
		return axios
			.get(
				`https://docs.google.com/spreadsheets/d/e/2PACX-1vQnkm-mjetc4iWGUog8A2CcW5D0_Z1aRfm3mFWUMk2UtNxyKhsMZUiDD6EqLziNT1qanEV8FU1S-y4G/pub?output=csv`,
				{
					responseType: "blob",
				}
			)
			.then(
				(response) =>
					new Promise<Product[]>((resolve, reject) => {
						Papa.parse(response.data, {
							header: true,
							complete: (results) => {
								const products = results.data as Product[]

								return resolve(
									products.map((product) => ({
										...product,
										price: Number(product.price),
									}))
								)
							},
							error: (error) => {
								return reject(error.message)
							},
						})
					})
			)
	},
}
