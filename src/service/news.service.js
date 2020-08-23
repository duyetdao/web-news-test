import axios from 'axios'
import moment from 'moment'
export const userService = {
    getTopHeadlineData,
    getdataCategory
}
let apikey = "99c3e7d30239433aa9139cc6f8115f24"
async function getTopHeadlineData() {
    try {
        const topHeadlineData = await axios.get("http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=" + apikey, {});
        return topHeadlineData;
    } catch (error) {
        console.error(error);
    }
}
async function getdataCategory(payload) {
    moment.locale('vi');
    try {
        const nonceInfo = await axios.get("http://newsapi.org/v2/everything?q=" + payload + "&from=" + new Date().toISOString().substring(0, 10) + "&sortBy=publishedAt&apiKey=" + apikey, {});
        return nonceInfo;
    } catch (error) {
        console.error(error);
    }
}