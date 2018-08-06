/**
 * Created by dj on 2018/8/4.
 */
(function(){
    //用来记录表格中需要显示的年月信息
    var dateObj = (function(){
        var nowdate = new Date();
        return {
            getDate : function(){
                return nowdate;
            },
            setDate : function(date) {
                nowdate = date;
            }
        };
    })();

    window.onload = function () {
        calendarBox();
        showCalendarData();
        bindEvent();
    };

    // div中渲染html元素
    function calendarBox() {
        var calendar = document.getElementsByClassName("calendar")[0];
        var titleBox = document.createElement("div");
        var bodyBox = document.createElement("div");

        titleBox.className = 'calendar-title-box';
        titleBox.innerHTML = "<span class='prev-month'></span>" + "<span class='calendar-title'></span>" + "<span class='next-month'></span>";
        calendar.appendChild(titleBox);
        bodyBox.className = 'calendar-body-box';
        //星期
        var headWek = "<tr>" +
            "<th>Su</th>" +
            "<th>Mo</th>" +
            "<th>Tu</th>" +
            "<th>We</th>" +
            "<th>Th</th>" +
            "<th>Fr</th>" +
            "<th>Sa</th>" +
            "</tr>";
        //日期表格
        var dateCon= "";
        for(var i = 0; i < 6; i++) {
            dateCon+= "<tr>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "</tr>";
        }
        bodyBox.innerHTML = "<table class='calendar-table'>" + headWek + dateCon+ "</table>";
        calendar.appendChild(bodyBox);
    }
    //表格中数据
    // 标题中的内容根据dateObj中取
    // 表格中的日期则中dateObj中取到年月对应的1号的所有信息
    function showCalendarData() {
        var year = dateObj.getDate().getFullYear();
        var month = dateObj.getDate().getMonth() + 1;
        var dateStr = getDateStr(dateObj.getDate());
        //年 ，月
        var calendarTitle = document.getElementsByClassName("calendar-title")[0];
        var titleStr = dateStr.substr(0, 4) + "年" + dateStr.substr(4,2) + "月";
        calendarTitle.innerText = titleStr;
        //日期数据
        var calendarTable = document.getElementsByClassName("calendar-table")[0];
        var calendarTds = calendarTable.getElementsByTagName("td");
        //该月第一天
        var firstDay = new Date(year, month - 1, 1);
        for(var i = 0; i < calendarTds.length; i++) {
            var thisDay = new Date(year, month - 1, i + 1 - firstDay.getDay());
            var thisDayStr = getDateStr(thisDay);
            calendarTds[i].innerText = thisDay.getDate();
            calendarTds[i].setAttribute('data', thisDayStr);
            if(thisDayStr == getDateStr(new Date())) {
                calendarTds[i].className = 'currentDay';
            }else if(thisDayStr.substr(0, 6) == getDateStr(firstDay).substr(0, 6)) {
                calendarTds[i].className = 'currentMonth';
            }else {
                calendarTds[i].className = 'otherMonth';
            }
        }
    }

    //上个月及下个月的事件绑定
    function bindEvent() {
        var prevMonth = document.getElementsByClassName("prev-month")[0];
        var nextMonth = document.getElementsByClassName("next-month")[0];
        prevMonth.addEventListener('click',() => {
            var date = dateObj.getDate();
            dateObj.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
            showCalendarData();
        },false);
       nextMonth.addEventListener('click',() => {
           var date = dateObj.getDate();
           dateObj.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
           showCalendarData();
       });
    }

    //日期转化为字符串
    function getDateStr(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        //1 2 ....9 10 11....
        month = (month > 9) ? ("" + month) : ("0" + month);
        day = (day > 9) ? ("" + day) : ("0" + day);
        return year + month + day;
    }
})();