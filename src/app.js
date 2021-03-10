class BookingApp extends React.Component {
	constructor(props) {
		super(props);
		this.handleSelectedBooking = this.handleSelectedBooking.bind(this);
		this.handleBooking = this.handleBooking.bind(this);
		this.state = {
			dates: this.dateArray(),
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
									afternoon: ['12:05 - 13:05', '13:10 - 14:10','14:15 - 15:15','15:20 - 16:20'],
									evening: ['18:55 - 19:55', '20:00 - 21:00' ]
								},
						sunday: {
									morning: ['10:25 - 11:25', '11:30 - 12:30'],
									afternoon: ['14:25 - 15:25','15:30 - 16:30'],
									evening: []
								},
					},
			selectedSlot: false,
			formError: false,
			booked: false
		};
	}

	dateArray() {
		let interval = 1;
		let date = new Date();
		let retVal = [new Date()];
		let nextDate;

		while (interval <= 2) {
			nextDate = date.setDate(date.getDate() + 1);
			retVal.push(new Date(nextDate));
			interval++;
		}

		return retVal;
	}

	handleSelectedBooking(slot) {
	    this.setState(() => {
	    	return {
	    		selectedSlot: {
	    						date: slot[0],
	    						time: slot[1]
	    					  }
	    	}
	    });
	}

	handleBooking(e) {
		e.preventDefault();
console.log('hb');
		if (!this.state.selectedSlot) {
			this.setState(() => {
				return {formError: true}
			});
		} else {
			this.setState(() => {
				return {
						formError: false,
						booked: true
					   }
			});
		}
	}

	render() {
		return (
			<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
				<div className="row col-md-4">
					<div className="col-md-12">
						<div className="card shadow-sm">
							<div className="card-body">
								<h5 className="card-title">Booking Summary</h5>
							    <h6 className={`card-subtitle mb-2 text-${this.state.formError ? 'danger' : 'muted'}`}>Date: {(this.state.selectedSlot && this.state.selectedSlot.date) ? this.state.selectedSlot.date : 'Please select a time slot'} </h6>
							    <h6 className="card-subtitle mb-2 text-muted">Time: {(this.state.selectedSlot && this.state.selectedSlot.time) ? this.state.selectedSlot.time : '-'}</h6>
							    <label htmlFor="num-people">Number of people:</label>
							    <select id="num-people" className="form-select" aria-label="Default select example">
								  <option defaultValue value="1">1</option>
								  <option value="2">2</option>
								  <option value="3">3</option>
								</select>
								<br />
								{!this.state.booked && <form onSubmit={this.handleBooking}>
							    	<button type="submit" className="btn btn-primary">Book</button>
							    </form>}
							    {this.state.booked && <h6 className="card-subtitle mb-2 text-info">All booked in. We're looking forward to seeing you skate on down. <span className="text-muted">See what we did there</span></h6>}
							</div>
						</div>
					</div>
				</div>
				<div className="row col-md-8">
					{this.state.dates.map((date) => <Calendar key={date.setDate(date.getDate())} day={new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).formatToParts(date)} slots={this.state.slots} handleSelectedBooking={this.handleSelectedBooking} />)}
				</div>
			</div>
		)
	}
}

const Calendar = (props) => {
	const dayOfWeek = props.day[0].value.toLowerCase();
	const morning = props.slots[dayOfWeek].morning;
	const afternoon = props.slots[dayOfWeek].afternoon;
	const evening = props.slots[dayOfWeek].evening;
	const dateStr = props.day[0].value+' '+props.day[2].value+' '+props.day[4].value+' '+props.day[6].value;

	return (
			<div className="col-md-4">
				<div className="card shadow-sm">
					<div className="card-header position-relative text-center">
						<img className="card-img card-calendar-img" src="images/calendar.svg" alt="calendar icon" />
						<div className="card-img-overlay">
							<h5 className="card-title text-center">
								{props.day[0].value}<br />
								{props.day[2].value}<br />
								{props.day[4].value}<br />
								{props.day[6].value}<br />
							</h5>
						</div>
					</div>

					<div className="card-body">
						{!!morning.length && <h5 className="card-title">Morning</h5>}
						{morning.map((slot) => <TimeSlot key={slot} slotDate={dateStr} slotText={slot} slotId={props.day[2].value} handleSelectedBooking={props.handleSelectedBooking} />)}
						
						{!!afternoon.length && <h5 className="card-title">Afternoon</h5>}
						{afternoon.map((slot) => <TimeSlot key={slot} slotDate={dateStr}slotText={slot} slotId={props.day[2].value} handleSelectedBooking={props.handleSelectedBooking} />)}

						{!!evening.length && <h5 className="card-title">Evening</h5>}
						{evening.map((slot) => <TimeSlot key={slot} slotDate={dateStr}slotText={slot} slotId={props.day[2].value} handleSelectedBooking={props.handleSelectedBooking} />)}
					</div>
				</div>
			</div>
	);
}

const TimeSlot = (props) => {
	const key = "btn-check-"+props.slotId+props.slotText.replace(/ +/g, "");
	return (
		<span>
			<input type="radio" className="btn-check" name="time-slot" id={key} value={props.slotDate} />
			<label onClick={(e) => {props.handleSelectedBooking([props.slotDate, props.slotText])}} className="btn btn-link btn-time-slot" htmlFor={key}>{props.slotText}</label>
		</span>
	);
}

ReactDOM.render(<BookingApp />, document.getElementById('app'));