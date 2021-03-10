'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BookingApp = function (_React$Component) {
	_inherits(BookingApp, _React$Component);

	function BookingApp(props) {
		_classCallCheck(this, BookingApp);

		var _this = _possibleConstructorReturn(this, (BookingApp.__proto__ || Object.getPrototypeOf(BookingApp)).call(this, props));

		_this.handleSelectedBooking = _this.handleSelectedBooking.bind(_this);
		_this.handleBooking = _this.handleBooking.bind(_this);
		_this.state = {
			dates: _this.dateArray(),
			slots: {
				monday: {
					morning: [],
					afternoon: ['13:15 - 14:15'],
					evening: []
				},
				tuesday: {
					morning: ['11:30 - 12:30'],
					afternoon: ['13:15 - 14:15'],
					evening: []
				},
				wednesday: {
					morning: [],
					afternoon: ['13:15 - 14:15'],
					evening: []
				},
				thursday: {
					morning: ['11:30 - 12:30'],
					afternoon: ['13:15 - 14:15'],
					evening: []
				},
				friday: {
					morning: [],
					afternoon: ['13:15 - 14:15'],
					evening: ['19:00 - 20:00', '20:05 - 21:05']
				},
				saturday: {
					morning: ['11:00 - 12:00'],
					afternoon: ['12:05 - 13:05', '13:10 - 14:10', '14:15 - 15:15', '15:20 - 16:20'],
					evening: ['18:55 - 19:55', '20:00 - 21:00']
				},
				sunday: {
					morning: ['10:25 - 11:25', '11:30 - 12:30'],
					afternoon: ['14:25 - 15:25', '15:30 - 16:30'],
					evening: []
				}
			},
			selectedSlot: false,
			formError: false,
			booked: false
		};
		return _this;
	}

	_createClass(BookingApp, [{
		key: 'dateArray',
		value: function dateArray() {
			var interval = 1;
			var date = new Date();
			var retVal = [new Date()];
			var nextDate = void 0;

			while (interval <= 2) {
				nextDate = date.setDate(date.getDate() + 1);
				retVal.push(new Date(nextDate));
				interval++;
			}

			return retVal;
		}
	}, {
		key: 'handleSelectedBooking',
		value: function handleSelectedBooking(slot) {
			this.setState(function () {
				return {
					selectedSlot: {
						date: slot[0],
						time: slot[1]
					}
				};
			});
		}
	}, {
		key: 'handleBooking',
		value: function handleBooking(e) {
			e.preventDefault();
			console.log('hb');
			if (!this.state.selectedSlot) {
				this.setState(function () {
					return { formError: true };
				});
			} else {
				this.setState(function () {
					return {
						formError: false,
						booked: true
					};
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return React.createElement(
				'div',
				{ className: 'row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3' },
				React.createElement(
					'div',
					{ className: 'row col-md-4' },
					React.createElement(
						'div',
						{ className: 'col-md-12' },
						React.createElement(
							'div',
							{ className: 'card shadow-sm' },
							React.createElement(
								'div',
								{ className: 'card-body' },
								React.createElement(
									'h5',
									{ className: 'card-title' },
									'Booking Summary'
								),
								React.createElement(
									'h6',
									{ className: 'card-subtitle mb-2 text-' + (this.state.formError ? 'danger' : 'muted') },
									'Date: ',
									this.state.selectedSlot && this.state.selectedSlot.date ? this.state.selectedSlot.date : 'Please select a time slot',
									' '
								),
								React.createElement(
									'h6',
									{ className: 'card-subtitle mb-2 text-muted' },
									'Time: ',
									this.state.selectedSlot && this.state.selectedSlot.time ? this.state.selectedSlot.time : '-'
								),
								React.createElement(
									'label',
									{ htmlFor: 'num-people' },
									'Number of people:'
								),
								React.createElement(
									'select',
									{ id: 'num-people', className: 'form-select', 'aria-label': 'Default select example' },
									React.createElement(
										'option',
										{ defaultValue: true, value: '1' },
										'1'
									),
									React.createElement(
										'option',
										{ value: '2' },
										'2'
									),
									React.createElement(
										'option',
										{ value: '3' },
										'3'
									)
								),
								React.createElement('br', null),
								!this.state.booked && React.createElement(
									'form',
									{ onSubmit: this.handleBooking },
									React.createElement(
										'button',
										{ type: 'submit', className: 'btn btn-primary' },
										'Book'
									)
								),
								this.state.booked && React.createElement(
									'h6',
									{ className: 'card-subtitle mb-2 text-info' },
									'All booked in. We\'re looking forward to seeing you skate on down. ',
									React.createElement(
										'span',
										{ className: 'text-muted' },
										'See what we did there'
									)
								)
							)
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'row col-md-8' },
					this.state.dates.map(function (date) {
						return React.createElement(Calendar, { key: date.setDate(date.getDate()), day: new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).formatToParts(date), slots: _this2.state.slots, handleSelectedBooking: _this2.handleSelectedBooking });
					})
				)
			);
		}
	}]);

	return BookingApp;
}(React.Component);

var Calendar = function Calendar(props) {
	var dayOfWeek = props.day[0].value.toLowerCase();
	var morning = props.slots[dayOfWeek].morning;
	var afternoon = props.slots[dayOfWeek].afternoon;
	var evening = props.slots[dayOfWeek].evening;
	var dateStr = props.day[0].value + ' ' + props.day[2].value + ' ' + props.day[4].value + ' ' + props.day[6].value;

	return React.createElement(
		'div',
		{ className: 'col-md-4' },
		React.createElement(
			'div',
			{ className: 'card shadow-sm' },
			React.createElement(
				'div',
				{ className: 'card-header position-relative text-center' },
				React.createElement('img', { className: 'card-img card-calendar-img', src: 'images/calendar.svg', alt: 'calendar icon' }),
				React.createElement(
					'div',
					{ className: 'card-img-overlay' },
					React.createElement(
						'h5',
						{ className: 'card-title text-center' },
						props.day[0].value,
						React.createElement('br', null),
						props.day[2].value,
						React.createElement('br', null),
						props.day[4].value,
						React.createElement('br', null),
						props.day[6].value,
						React.createElement('br', null)
					)
				)
			),
			React.createElement(
				'div',
				{ className: 'card-body' },
				!!morning.length && React.createElement(
					'h5',
					{ className: 'card-title' },
					'Morning'
				),
				morning.map(function (slot) {
					return React.createElement(TimeSlot, { key: slot, slotDate: dateStr, slotText: slot, slotId: props.day[2].value, handleSelectedBooking: props.handleSelectedBooking });
				}),
				!!afternoon.length && React.createElement(
					'h5',
					{ className: 'card-title' },
					'Afternoon'
				),
				afternoon.map(function (slot) {
					return React.createElement(TimeSlot, { key: slot, slotDate: dateStr, slotText: slot, slotId: props.day[2].value, handleSelectedBooking: props.handleSelectedBooking });
				}),
				!!evening.length && React.createElement(
					'h5',
					{ className: 'card-title' },
					'Evening'
				),
				evening.map(function (slot) {
					return React.createElement(TimeSlot, { key: slot, slotDate: dateStr, slotText: slot, slotId: props.day[2].value, handleSelectedBooking: props.handleSelectedBooking });
				})
			)
		)
	);
};

var TimeSlot = function TimeSlot(props) {
	var key = "btn-check-" + props.slotId + props.slotText.replace(/ +/g, "");
	return React.createElement(
		'span',
		null,
		React.createElement('input', { type: 'radio', className: 'btn-check', name: 'time-slot', id: key, value: props.slotDate }),
		React.createElement(
			'label',
			{ onClick: function onClick(e) {
					props.handleSelectedBooking([props.slotDate, props.slotText]);
				}, className: 'btn btn-link btn-time-slot', htmlFor: key },
			props.slotText
		)
	);
};

ReactDOM.render(React.createElement(BookingApp, null), document.getElementById('app'));
