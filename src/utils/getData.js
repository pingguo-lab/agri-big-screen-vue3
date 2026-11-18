export default function getData(type) {
    if (localStorage.getItem("topicId")) {
        this.topicId = localStorage.getItem("topicId");
    }
    return this.$get("/msg/large", {
        topicId: "20",
        room: "1",
        timeType: `${type}`,
    }).then((res) => {
        return res;
    });

}