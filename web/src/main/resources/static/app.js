(function () {

    let stomp = null;
    let map = null;
    let value = 8.516515;

    function connect() {
        const socket = new SockJS('/hazelcast');
        stomp = Stomp.over(socket);
        stomp.reconnect_delay = 2000;
        stomp.connect({}, function (frame) {
            stomp.subscribe('/topic/updates', showUpdate);
        });
    }

    function showUpdate(update) {
        const marker = L.marker([46.819382, value++]);
        marker.addTo(map);
    }

    function createMap() {
        map = L.map('map').setView([46.819382, 8.416515], 9);
        L.tileLayer(
            'https://tile.thunderforest.com/transport/{z}/{x}/{y}{r}.png?apikey=170be1cff4224274add97bf552fd4745',
            {
                attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,'
                    + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
            }
        ).addTo(map);
    }

    this.initialize = function () {
        createMap();
        connect();
        $.ajax('/data/');
    };

    return {
        initialize: initialize
    }

})().initialize();