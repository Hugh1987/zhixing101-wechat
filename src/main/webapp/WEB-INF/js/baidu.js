/**
 * 百度地图JS
 */

// 初始化地图
function initMap(lng, lat, searchRadius, storagePlaceGeotableId) {

	// 根据wgs84坐标创建地理坐标点
	var pointWgs84 = new BMap.Point(lng, lat);

	// 创建地图实例
	var map = new BMap.Map("mapContainer");

	// 在地图上显示point点
	function displayPoint(point) {
		var marker = new BMap.Marker(point);
		map.addOverlay(marker);
		var label = new BMap.Label("当前位置", {
			offset : new BMap.Size(20, -10)
		});
		marker.setLabel(label);
		
		setLngLat(point);
	}

	function setLngLat(point) {
		// 存储微信getLocation函数获取到的经纬度
		document.getElementById("globalLongtitude").value = point.lng;
		document.getElementById("globalLatitude").value = point.lat;
	};

	// 坐标转换完之后的回调函数
	translateCallback = function(data) {
		if (data.status === 0) {

			var point = data.points[0];
			displayPoint(point);
			map.centerAndZoom(point, 15);
			map.addControl(new BMap.NavigationControl());
		}
	}

	setTimeout(function() {
		var convertor = new BMap.Convertor();
		var pointArr = [];
		pointArr.push(pointWgs84);
		convertor.translate(pointArr, 1, 5, translateCallback)
	}, 0);

}