var tswlairmgr = tswlairmgr || {};
tswlairmgr.turnin = tswlairmgr.turnin || {};

tswlairmgr.turnin.Participants = function Participants(node) {
	this.rowPrototype = null;
	this.list = [];
	
	var self = this;
	
	this.el = {
		root: node,
		addForm: {
			root: document.getElementById("participants-add"),
			nameField: document.getElementById("participants-add-name"),
			addButton: document.getElementById("participants-add-submit")
		},
		table: {
			root: document.getElementById("participants-list"),
			content: document.getElementById("participants-list").getElementsByTagName("tbody")[0]
		},
		counter: {
			count: document.getElementById("participants-list-count").getElementsByClassName("count")[0],
			subject: document.getElementById("participants-list-count").getElementsByClassName("subject")[0]
		}
	};
	
	this.update = function() {
		if(tswlairmgr.turninpicktableInstance)
		{
			tswlairmgr.turninpicktableInstance.update();
		}
		
		this.redraw();
	}
	
	this.redraw = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.turnin.Participants> redraw called');
		}
		
		/* Clear table */
		while(this.el['table']['content'].firstChild)
		{
			this.el['table']['content'].removeChild(this.el['table']['content'].firstChild);
		}
		
		for(var i=0; i<this.list.length; i++)
		{
			var participant = this.list[i];
			
			var newRowNode = this.rowPrototype.cloneNode(true); /* Deep copy */
			
			newRowNode.getElementsByClassName("name")[0].innerHTML = participant.name;
			for(var j=0; j<participant.missionAvailability.length; j++)
			{
				newRowNode.getElementsByClassName("mission-checkbox")[j]
					.getElementsByClassName("checkbox")[0]
					.checked = participant.missionAvailability[j];
				
				newRowNode.getElementsByClassName("mission-checkbox")[j]
					.getElementsByClassName("checkbox")[0]
					.onchange = (function(obj, x, y) {
						return function() {
							obj.toggleParticipantMissionAvailability(x, y);
						}
					})(this, i, j);
			}
			
			newRowNode.getElementsByClassName("actions")[0]
				.getElementsByClassName("button-remove")[0]
				.onclick = (function(obj, x) {
					return function() {
						obj.removeParticipant(x);
					}
			})(this, i);
			
			this.el['table']['content'].appendChild(newRowNode);
		}
		
		this.el['counter']['count'].innerHTML = this.list.length;
		this.el['counter']['subject'].innerHTML = (this.list.length == 1) ? 'participant' : 'participants';
	};
	
	this.getParticipantsAvailableForMission = function(missionId) {
		var matched = [];
		
		for(var i=0; i<this.list.length; i++)
		{
			if(this.list[i].missionAvailability[missionId] == true)
			{
				matched[matched.length] = this.list[i].name;
			}
		}
		
		return(matched);
	};
	
	this.getParticipants = function() {
		var newList = [];
		for(var i=0; i<this.list.length; i++)
		{
			newList[i] = {name: this.list[i].name};
		}
		return(newList);
	};
	
	this.listContainsParticipant = function(name) {
		for(var i=0; i<this.list.length; i++)
		{
			if(this.list[i].name == name)
			{
				return(true);
			}
		}
		return(false);
	};
	
	this.validateParticipantName = function(name) {
		if(
			name.match(/^[a-zA-Z0-9\-]+$/) &&
			!name.match(/.\1{3,}/) &&
			name.length >= 3 &&
			name.length < 32 &&
			!this.listContainsParticipant(name)
		)
		{
			return(true);
		}
		
		alert(
			'You have entered an invalid name.\n' +
			'\n' +
			'Valid names:\n' +
			'- are at least three characters in length,\n' +
			'- only consist of uppercase (A-Z) and lowercase (a-z) letters as well as digits (0-9) and dashes (-),\n' +
			'- do not contain more than 3 of the same character in sequence.\n' +
			'You also cannot add the same character multiple times.'
		);
		return(false);
	};
	
	this.addParticipant = function(name) {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.turnin.Participants> addParticipant called: ['+name+']');
		}
		
		if(!this.validateParticipantName(name))
		{
			return(false);
		}
		
		this.list[this.list.length] = {
			name: name,
			missionAvailability: [
				true,
				true,
				true
			]
		}
		
		this.update();
		
		return(true);
	};
	
	this.removeParticipant = function(participantId) {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.turnin.Participants> removeParticipant called: ['+participantId+' <'+this.list[participantId]['name']+'>]');
		}
		
		this.list.splice(participantId, 1);
		
		this.update();
	};
	
	this.toggleParticipantMissionAvailability = function(participantId, missionId) {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.turnin.Participants> toggleMissionAvailability called: ['+participantId+' <'+this.list[participantId]['name']+'>, '+missionId+']');
		}
		
		var status = this.getParticipantMissionAvailability(participantId, missionId);
		if(status == true)
		{
			this.setParticipantMissionAvailability(participantId, missionId, false);
		}
		else
		{
			this.setParticipantMissionAvailability(participantId, missionId, true);
		}
	};
	
	this.getParticipantMissionAvailability = function(participantId, missionId) {
		return(this.list[participantId].missionAvailability[missionId]);
	};
	
	this.getParticipantMissionAvailabilityByName = function(name, missionId) {
		for(var i=0; i<this.list.length; i++)
		{
			if(this.list[i].name == name)
			{
				return(this.getParticipantMissionAvailability(i, missionId));
			}
		}
	};
	
	this.setParticipantMissionAvailability = function(participantId, missionId, status) {
		this.list[participantId].missionAvailability[missionId] = status;
		
		this.update();
	};
	
	this.setParticipantMissionAvailabilityByName = function(name, missionId, status) {
		for(var i=0; i<this.list.length; i++)
		{
			if(this.list[i].name == name)
			{
				return(this.setParticipantMissionAvailability(i, missionId, status));
			}
		}
	};
	
	this.addFormHandler = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.turnin.Participants> addFormHandler called');
		}
		
		if(!self.addParticipant(self.el['addForm']['nameField'].value))
		{
			return(false);
		}
		
		self.el['addForm']['nameField'].value = '';
		
		/* Refocus name field for faster sequential input */
		self.el['addForm']['nameField'].focus();
		
		/* Don't actually submit the form */
		return(false);
	};
	
	this.init = function() {
		/* Initialize row prototype */
		var rowPrototypeNode = this.el['table']['content'].getElementsByClassName("prototype")[0];
		this.rowPrototype = rowPrototypeNode.cloneNode(true); /* Deep copy */
		
		/* Remove prototype class */
		var rowPrototypeClasses = this.rowPrototype.className.split(" ");
		var prototypeClassIndex = rowPrototypeClasses.indexOf("prototype");
		if(prototypeClassIndex > -1) /* should always be true, but check for sanity */
		{
			rowPrototypeClasses.splice(prototypeClassIndex, 1);
		}
		this.rowPrototype.className = rowPrototypeClasses.join(" ");
		
		rowPrototypeNode.parentNode.removeChild(rowPrototypeNode);
		
		/* Block form */
		this.el['addForm']['root'].onsubmit = function() { return false; };
		
		/* Enhance form input */
		var localThis = this;
		this.el['addForm']['nameField'].onkeydown = function(e) {
			if(e.keyCode == 13) /* Enter key */
			{
				localThis.addFormHandler();
			}
		}
		this.el['addForm']['addButton'].onclick = this.addFormHandler;
		
		this.update();
	};
	
	if(tswlairmgr.settings.debug)
	{
		console.log('<tswlairmgr.turnin.Participants> instance created');
	}
	
	this.init();
};