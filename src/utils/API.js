// import axios from "axios";
import rp from "request-promise";

export default {
	// test: function(userData) {
	// 	console.log("test POST");
	// 	return axios.post("/authstatus", userData);
	// },

	search: function(cardData) {
		const reqObj = {
			method: "GET",
			uri: "https://api.scryfall.com/cards/search?q=" + cardData.name
		}
		return rp(reqObj);
	}
}