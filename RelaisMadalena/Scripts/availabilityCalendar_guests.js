(function ($) {
	
	if($("#availableCalendar").length){
    var customerName = "www.relaismaddalena.com";
    var bookingString = "/secure_booking/";
    var http = "https";
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var numberOfMonthsTodisplay = w > 480 ? 2 : 1;
    /*var numberOfMonthsTodisplay = 2;*/

    $(document).on({
        mouseenter: function () {
            if ($("div.ui-datepicker-inline").is("[startselected]")) {

                var startdate = $(this).closest('.availCalendarElina').datepicker('getDate');
                var currentDate = new Date();
                currentDate.setFullYear($(this).data("year"));
                currentDate.setMonth($(this).data("month"));
                currentDate.setDate($(this).text());
                var nights = Math.floor((currentDate - startdate) / 86400000);
                if (nights > 0) {
                    if ($("div.ui-datepicker-inline").is("[endselected]")) {} else {
                        var start = $('div.ui-datepicker-inline td').index($(".calendar-selection-start"));
                        var end = $('div.ui-datepicker-inline td').index($(this));
                        //check if there is unavailable date in the middle
                        var unavailable = $("div.ui-datepicker-inline td").slice(start + 1, end).hasClass('calendar-unavailable');
                        if (unavailable == false) {
                            $(this).addClass("calendar-selection-end");
                            $("div.ui-datepicker-inline td").slice(start + 1, end).addClass('calendar-selection-middle');
                        }
                    }
                }
            }
        },
        mouseleave: function () {
            if ($("div.ui-datepicker-inline").is("[endselected]")) {} else {
                $(this).closest('.availCalendarElina').find("td").removeClass("calendar-selection-middle calendar-selection-end");
            }
        }
    }, '.availCalendarElina td');
    //Cancel	
    $(document).on('click', '.calendar-cancel', function () {
        $(".availCalendarElina .ui-datepicker-inline").removeAttr("startSelected endSelected");
        $(".availCalendarElina .ui-datepicker-inline").find("td").removeClass("calendar-selection-start calendar-selection-middle calendar-selection-end-confirm calendar-selection-end");
        $("#availableCalendar").fadeOut();
        $("#availableCalendar .warning").html();
        CalculatedEndDate = null;
        var calendar = $('.availCalendarElina');
        calendar.datepicker("refresh");
        $(".ui-datepicker-inline").remove();
        $(".ui-datepicker-div").remove();
        $(".hasDatepicker").removeClass('hasDatepicker');
        $("#checkAvailabilityTab").click();
        $("#peopleNumberPopup-selection").text("");
        $("#peopleNumberPopup").show();
		
        GetCalendar(calendar, currentYear, currentMonth, propertyGroupId, ownerPropertyId, areaId, typeId, promoCode);

    });
    $(document).on('click', "#discountTriggerPBEpopup", function () {
        $(this).parent().find('#discountOpenerPBEpopup').slideToggle();
    });


    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            $(".calendar-cancel").click();
        } // Esc key
    });

    //The Magic begins	

    var ownerPropertyId = $("#availableCalendar").data().owner;
    var propertyGroupId = 0;
    var areaId = $("#availableCalendar").attr('data-area');
    var typeId = $("#availableCalendar").attr('data-type');

    var calendar = $('.calendarPlaceholder');
    var date = $('#start').val();
    var currentDate = new Date();

    /*	if (date != null) {
    		var currentDate = $.datepicker.parseDate("dd/mm/yy", date);
    	};*/
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;

    var DateRangeForDatePicker = [];
    var DataForDatePicker;
	var promoCode = $("#elina-promocode").val();
		
    function GetCalendar(calendar, currentYear, currentMonth, propertyGroupId, ownerPropertyId, areaId, typeId, promoCode) {
        $.ajax({
            type: 'GET',
            url: http + '://' + customerName + bookingString + 'bookings/GetTestAvailabilityCalendar',
            dataType: 'jsonp',
            jsonp: 'callback',
            data: {
                year: currentYear,
                month: currentMonth,
                propertyGroupId: propertyGroupId,
                areaId: areaId,
                typeId: typeId,
                ownerPropertyId: ownerPropertyId
            },
            success: function (data) {
                DateRangeForDatePicker.length = 0;
                $.each(data, function (key, value) {
                    DateRangeForDatePicker.push(key);
                });
                DataForDatePicker = data;
                var todayDate = new Date();
                calendar.datepicker({
                    numberOfMonths: numberOfMonthsTodisplay,
                    dateFormat: 'dd/mm/yy',
                    minDate: todayDate,
                    defaultDate: new Date(currentYear, currentMonth - 1, 1),
                    onSelect: function (dateText, inst) {

                        /* Suggestions magic needs to happen here */
                        if ($("#availableCalendar").data("suggestions") == true) {

                            if ($("#availableCalendar").hasClass("startDateSelected") && $(this).find("div.ui-datepicker-inline").is("[startselected]")) {
                                // Here in case start date is selected, so custom date needs to be suggested	
                                var endDate = $(this).datepicker('getDate');
                                var startDateStr = $(this).find("div.ui-datepicker-inline").attr('startSelected');
                                displayEndDate = $.datepicker.formatDate('dd MM yy', endDate);
                                var startDate = new Date(startDateStr);

                                displayStartDate = $.datepicker.formatDate('dd MM yy', startDate);
                                formattedStartDate = $.datepicker.formatDate('dd/mm/yy', startDate);
                                formattedEndDate = $.datepicker.formatDate('dd/mm/yy', endDate);
                                var guestsFinal = $("#peopleNumberPopup").val();
                                $("#elina-custom-selection, #date-selection-sug").slideToggle().remove();
								var promoCode = $("#elina-promocode").val();
                                if (startDate < endDate) {
                                    $(this).find("div.ui-datepicker-inline").attr("endSelected", endDate);
                                    var dayDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
                                    $.ajax({
                                        type: "GET",
                                        url: http + '://' + customerName + bookingString + 'bookings/GetAvailabilityResultByDatesCrossDomain',
                                        dataType: "jsonp",
                                        jsonp: 'callback',
                                        data: {
                                            startDate: formattedStartDate,
                                            endDate: formattedEndDate,
                                            areaId: areaId,
                                            typeId: typeId,
                                            guest: guestsFinal,
                                            ownerPropertyId: ownerPropertyId,
											promotionCode: promoCode
                                        },
                                        success: function (result) {
                                            if (result.Success == false) {
                                                /*$("#elina-suggestions #elina-dates-container li.date-sug[data-addday='" + elementDate + "']").append(
                                                	'<label for="elina_sel_' + elementDate + '">' + elementDate + " Nights not available</label><div>" + formattedSStart + " - " + formattedSEnd + "</div>"
                                                ).removeClass("avail-date").fadeIn(); */
                                                $("#elina-suggestions #elina-dates-container").prepend('<li id="date-selection-sug" class="date-placeholder">Your Selection</li><li class="date-sug" id="elina-custom-selection" data-addday="' + dayDiff + '" style="display:none;"><label for="elina_sel_custom">' + dayDiff + ' Nights not available </label><div>' + formattedStartDate + ' - ' + formattedEndDate + '</div></li>');
                                                $("#elina-custom-selection").slideToggle();
                                                //     $("#peopleNumberPopup").hide();
                                                //     $("#peopleNumberPopup-selection").text(guestsFinal);
                                            } else {
                                                //console.log("so far so good?");
                                                $("#elina-suggestions #elina-dates-container").prepend('<li id="date-selection-sug" class="date-placeholder">Your Selection</li><li class="date-sug avail-date" id="elina-custom-selection" data-addday="' + dayDiff + '" style="display:none;"><input type="radio" name="elina-book" data-start="' + formattedStartDate + '" data-end="' + formattedEndDate + '" value="_' + dayDiff + '" id="elina_sel_custom"><label for="elina_sel_custom">' + dayDiff + ' Nights for ' + result.Data.price + '</label><div>' + formattedStartDate + ' - ' + formattedEndDate + '</div></li>');
                                                $("#elina-custom-selection").slideToggle().find("input").click();
                                                //   $("#peopleNumberPopup").hide();
                                                //  $("#peopleNumberPopup-selection").text(guestsFinal);
                                            }
                                        }
                                    });
                                };
                            } else {
                                $("#elina-cleardates").fadeIn();
                                var startDate = $(this).datepicker('getDate');
                                $(this).find('div.ui-datepicker-inline').attr('startSelected', startDate);
                                $(this).find(".ui-datepicker-current-day").addClass("calendar-selection-start");

                                $("#availableCalendar").addClass("startDateSelected");
                                $("#elina-suggestions #elina-dates-container li.date-sug").hide().html("");
                                $("#check-here").hide();
                                $("#loadingPanel").fadeIn();

                                // Dates suggested
                                var SselectedDate = $(this).datepicker('getDate');
                                var SselectedDateEnd = $(this).datepicker('getDate');
                                var guestsFinal = $("#peopleNumberPopup").val();

                                $("#elina-suggestions #elina-dates-container li.date-sug").each(function (index) {
                                    var elementDate = $(this).data("addday");
                                    //		console.log(elementDate);
                                    setTimeout(function () {
                                        SselectedDateEnd.setDate(SselectedDate.getDate() + elementDate);
                                        //		console.log(SselectedDateEnd);
                                        var formattedSStart = $.datepicker.formatDate('dd/mm/yy', SselectedDate);
                                        var formattedSEnd = $.datepicker.formatDate('dd/mm/yy', SselectedDateEnd);
										var promoCode = $("#elina-promocode").val();										
                                        /*	console.log(formattedSStart);
                                        	console.log(formattedSEnd);
                                        	console.log(ownerPropertyId);*/
                                        $.ajax({
                                            type: "GET",
                                            url: http + '://' + customerName + bookingString + 'bookings/GetAvailabilityResultByDatesCrossDomain',
                                            dataType: "jsonp",
                                            jsonp: 'callback',
                                            data: {
                                                startDate: formattedSStart,
                                                endDate: formattedSEnd,
                                                areaId: areaId,
                                                typeId: typeId,
                                                guest: guestsFinal,
                                                ownerPropertyId: ownerPropertyId,
												promotionCode: promoCode 
                                            },
                                            success: function (result) {
                                                if (result.Success == false) {
                                                    $("#elina-suggestions").fadeIn();
                                                    $("#loadingPanel").hide();
                                                    $("#elina-suggestions #elina-dates-container li.date-sug[data-addday='" + elementDate + "']").append(
                                                        '<label for="elina_sel_' + elementDate + '">' + elementDate + " Nights not available</label><div>" + formattedSStart + " - " + formattedSEnd + "</div>"
                                                    ).removeClass("avail-date").fadeIn();
                                                    //       $("#peopleNumberPopup").hide();
                                                    //     $("#peopleNumberPopup-selection").text(guestsFinal);
                                                } else {
                                                    //	console.log("so far so good");
                                                    $("#elina-suggestions").fadeIn();
                                                    $("#loadingPanel").hide();
                                                    $("#elina-suggestions #elina-dates-container li.date-sug[data-addday='" + elementDate + "']").append(
                                                        '<input type="radio" name="elina-book" data-start="' + formattedSStart + '" data-end="' + formattedSEnd + '" value="_' + elementDate + '" id="elina_sel_' + elementDate + '"><label for="elina_sel_' + elementDate + '">' +
                                                        elementDate + " Nights for " + result.Data.price + "</label><div>" + formattedSStart + " - " + formattedSEnd + "</div>"
                                                    ).addClass("avail-date").fadeIn();
                                                    //   $("#peopleNumberPopup").hide();
                                                    // $("#peopleNumberPopup-selection").text(guestsFinal);
                                                }
                                            }
                                        });

                                    }, 500 + (index * 500));
                                });
                            }


                        } else
                            /* END magic needs to happen here */
                            if ($(this).find("div.ui-datepicker-inline").is("[startselected]")) {
                                var endDate = $(this).datepicker('getDate');
                                var startDateStr = $(this).find("div.ui-datepicker-inline").attr('startSelected');

                                displayEndDate = $.datepicker.formatDate('dd MM yy', endDate);
                                var startDate = new Date(startDateStr);
                                displayStartDate = $.datepicker.formatDate('dd MM yy', startDate);
                                formattedStartDate = $.datepicker.formatDate('dd/mm/yy', startDate);
                                formattedEndDate = $.datepicker.formatDate('dd/mm/yy', endDate);

                                if (startDate < endDate) {
                                    $(this).find("div.ui-datepicker-inline").attr("endSelected", endDate);
                                    var popup = $("#availableCalendar");
                                    popup.find('.btn').attr('data-startdate', formattedStartDate);
                                    popup.find('.btn').attr('data-enddate', formattedEndDate);
                                    popup.find('.btn').attr('data-propertygroupID', propertyGroupId);
                                    popup.find('.btn').attr('data-ownerPropertyID', ownerPropertyId);

                                    $.ajax({
                                        type: "GET",
                                        url: http + '://' + customerName + bookingString + 'bookings/GetAvailabilityResultByDatesCrossDomain',
                                        dataType: "jsonp",
                                        jsonp: 'callback',
                                        data: {
                                            startDate: formattedStartDate,
                                            endDate: formattedEndDate,
                                            areaId: areaId,
                                            typeId: typeId,
                                            ownerPropertyId: null
                                        },
                                        success: function (result) {
                                            if (result.Success == false) {
                                                if (result.Data.reason == "LOS") {
                                                    popup.find('.warning').text(result.Data.displayMessage);
                                                    popup.find('a.btn.btn-primary').hide();
                                                }
                                                if (result.Data.reason == "CONS") {
                                                    //promoRow
                                                    popup.find('.warning').text(result.Data.displayMessage);
                                                    popup.find('.btn').hide();
                                                    //add panel for consecutive availability with 3 buttons and hidden  for result.Data.properties
                                                }
                                            } else {
                                                popup.find('.warning').text('');
                                                popup.find('.btn').attr('rate-rule-id', result.Data).show();
                                                popup.find('#calculatedPrice').html(result.Data.price);
                                                popup.find('#intFees').html(result.Data.fees);
                                            }
                                        }
                                    });
                                    popup.find("#selectedStartDate").text(displayStartDate);
                                    popup.find("#selectedEndDate").text(displayEndDate);
                                    popup.fadeIn();
                                }
                            } else {
                                var startDate = $(this).datepicker('getDate');
                                $(this).find('div.ui-datepicker-inline').attr('startSelected', startDate);
                                $(this).find(".ui-datepicker-current-day").addClass("calendar-selection-start");
                            }
                    },
                    beforeShowDay: function (date) {
                        var search = (('0' + date.getDate()).slice(-2)) + "/" + (('0' + (date.getMonth() + 1)).slice(-2)) + "/" + date.getFullYear();
                        var additionalclass = "";
                        var startDate = new Date($(this).find('div.ui-datepicker-inline').attr('startSelected'));
                        var endDate = new Date($(this).find('div.ui-datepicker-inline').attr('endSelected'));
                        var datesInBetween = new Array();
                        var nextDate = new Date(startDate);
                        nextDate.setDate(startDate.getDate() + 1);
                        for (var i = nextDate; i < endDate; i.setDate(i.getDate() + 1)) {
                            datesInBetween.push($.datepicker.formatDate('dd/mm/yy', i));
                        }
                        var selectedStartDate = $.datepicker.formatDate('dd/mm/yy', startDate);
                        var selectedEndDate = $.datepicker.formatDate('dd/mm/yy', endDate);
                        if (search == selectedStartDate) {
                            additionalclass = " calendar-selection-start";
                        }
                        if (search == selectedEndDate) {
                            additionalclass = " calendar-selection-end-confirm";
                        }
                        if (datesInBetween.indexOf(search) !== -1) {
                            additionalclass = " calendar-selection-middle";
                        }
                        if (DateRangeForDatePicker.indexOf(search) !== -1) {
                            var css = DataForDatePicker[search];
                            var isselectable = false;
                            if (css != null) {
                                isselectable = css.indexOf("calendar-available") >= 0;
                                if (!isselectable && css.indexOf("calendar-previous-available") >= 0)
                                    isselectable = true;

                                if (isselectable && css.indexOf("calendar-next-unavailable") >= 0 && !$(this).find("div.ui-datepicker-inline").is("[startSelected]"))
                                    isselectable = false;

                                var isCalculatedEndDate = $(this).find("div.ui-datepicker-inline").is("[calculatedEndDate]");
                                var calculatedEndDate = new Date($(this).find('div.ui-datepicker-inline').attr('calculatedEndDate'));

                                if (css.indexOf("calendar-unavailable") >= 0 && startDate != null && startDate < date) {
                                    if (!isCalculatedEndDate || date < calculatedEndDate) {
                                        var currentDate = new Date(date.getTime());
                                        $(this).find('div.ui-datepicker-inline').attr('calculatedEndDate', currentDate);
                                        calculatedEndDate = currentDate;
                                    }
                                }
                                if (isCalculatedEndDate && date > calculatedEndDate) {
                                    isselectable = false;
                                }
                                //isselectable = false;
                            }
                            return [isselectable, css + additionalclass];
                        }
                        if (date < todayDate) {
                            return [false, "calendar-past"];
                        }
                        return [false, "calendar-empty"];
                    },
                    onChangeMonthYear: function (year, month, widget) {
                        $.ajax({
                            type: 'GET',
                            url: http + '://' + customerName + bookingString + 'bookings/GetTestAvailabilityCalendar',
                            dataType: 'jsonp',
                            jsonp: 'callback',
                            data: {
                                year: year,
                                month: month,
                                propertyGroupId: propertyGroupId,
                                areaId: areaId,
                                typeId: typeId,
                                ownerPropertyId: ownerPropertyId
                            },
                            success: function (data) {

                                $(this).datepicker('setDate', new Date(year, month, 1));
                                DateRangeForDatePicker.length = 0;
                                $.each(data, function (key, value) {
                                    DateRangeForDatePicker.push(key);
                                });
                                DataForDatePicker = data;
                                calendar.datepicker("refresh");
                                $("td.calendar-cell").removeClass("calendar-selected-middle calendar-selected-end calendar-selected-start");
                            }
                        });
                    }
                });

                var loadingSpin = calendar.find('.calendarLoadingContainer');
                loadingSpin.hide();
                $("td.calendar-cell").removeClass("calendar-selected-middle calendar-selected-end calendar-selected-start");
            }
        });
        $("td.calendar-cell").removeClass("calendar-selected-middle calendar-selected-end calendar-selected-start");
    }


    //End of interesting Area //

    GetCalendar(calendar, currentYear, currentMonth, propertyGroupId, ownerPropertyId, areaId, typeId, promoCode);


    $(document).on('change', '#peopleNumberPopup', function () {
        $("#elina-cleardates").click();
        GetCalendar(calendar, currentYear, currentMonth, propertyGroupId, ownerPropertyId, areaId, typeId, promoCode);
    });

    $(document).on('click', "#availableCalendar .btn", function () {
        //make a booking
        var startDateFinal = $(this).attr("data-startdate");
        var endDateFinal = $(this).attr("data-enddate");
        var propertyGroupId = $(this).attr("data-propertygroupID");
        var ownerPropertyID = $(this).attr("data-ownerPropertyID");
        var areaIdFinal = $("#availableCalendar").attr('data-area');
        var typeIdFinal = $("#availableCalendar").attr('data-type');
        var guestsFinal = $(".peopleNumberPopup").val();
        var promoCode = $('#elina-promocode').val();

        //empty shopping basket
        $.ajax({
            type: "GET",
            url: http + '://' + customerName + bookingString + 'shoppingCart/EmptyCartCrossDomain',
            dataType: "jsonp",
            jsonp: 'callback',

            success: function (result) {
                if (result.Success) {
                    $(".calendarLoadingSearchStarted").fadeIn();
                    $.ajax({
                        type: "GET",
                        url: http + '://' + customerName + bookingString + 'shoppingCart/BookFromCalendarCrossDomain',
                        dataType: "jsonp",
                        jsonp: 'callback',
                        data: {
                            startDate: startDateFinal,
                            endDate: endDateFinal,
                            areaId: areaIdFinal,
                            typeId: typeIdFinal,
                            numOfGuests: guestsFinal,
                            promotionCode: promoCode
                        },
                        success: function (result) {
                            if (result.Success) {
                                $.ajax({
                                    type: "GET",
                                    url: http + '://' + customerName + bookingString + 'Search/RedirectToSearchResults',
                                    dataType: "jsonp",
                                    jsonp: 'callback',
                                    success: function (response) {
                                        window.location.href = response.Url;
                                    }
                                });
                            } else {
                                alert(result.ErrorMessage);
                                $(".calendarLoadingSearchStarted").fadeOut();
                            }
                        }

                    });
                }
            }
        });


    });

    $(document).on("click", "#elina-dates-container li.avail-date", function () {
        var startDate = $(this).find("input").data("start");
        var endDate = $(this).find("input").data("end");

        $("#elina-submit-custom").data("start", startDate).data("end", endDate).fadeIn();	

    });
    $(document).on('click', "#elina-submit-custom", function () {
        //make a booking
        var startDateFinal = $(this).data("start");
        var endDateFinal = $(this).data("end");
        var propertyGroupId = null;
        var ownerPropertyID = null;
        var areaIdFinal = $("#availableCalendar").attr('data-area');
        var typeIdFinal = $("#availableCalendar").attr('data-type');
        var guestsFinal = $("#peopleNumberPopup").val();
        var promoCode = $('#elina-promocode').val();

        //empty shopping basket
        $.ajax({
            type: "GET",
            url: http + '://' + customerName + bookingString + 'shoppingCart/EmptyCartCrossDomain',
            dataType: "jsonp",
            jsonp: 'callback',

            success: function (result) {
                if (result.Success) {
                    $(".calendarLoadingSearchStarted").fadeIn();
                    $.ajax({
                        type: "GET",
                        url: http + '://' + customerName + bookingString + 'shoppingCart/BookFromCalendarCrossDomain',
                        dataType: "jsonp",
                        jsonp: 'callback',
                        data: {
                            startDate: startDateFinal,
                            endDate: endDateFinal,
                            areaId: areaIdFinal,
                            typeId: typeIdFinal,
                            numOfGuests: guestsFinal,
                            promotionCode: promoCode
                        },
                        success: function (result) {
                            if (result.Success) {
                                $.ajax({
                                    type: "GET",
                                    url: http + '://' + customerName + bookingString + 'Search/RedirectToSearchResults',
                                    dataType: "jsonp",
                                    jsonp: 'callback',
                                    success: function (response) {
                                        window.location.href = response.Url;
                                    }
                                });
                            } else {
                                alert(result.ErrorMessage);
                                $(".calendarLoadingSearchStarted").hide();
                            }
                        }

                    });
                }
            }
        });


    });
    $(document).on("click", "#elina-cleardates", function () {
        //$(this).fadeOut();
        $("#elina-dates-container li.date-sug").fadeOut().html("");
        $("#elina-custom-selection, #date-selection-sug").remove();
        $(".calendar-cancel").click();
        $("#elina-submit-custom").hide();		
        $("#elina-suggestions").hide();
        $("#check-here").fadeIn();
        $("#availableCalendar").removeClass("startDateSelected");
    });
}
})(jQuery);