var tswlairmgr = tswlairmgr || {};
tswlairmgr.modules = tswlairmgr.modules || {};
tswlairmgr.modules.organizer = tswlairmgr.modules.organizer || {};
tswlairmgr.modules.organizer.classes = tswlairmgr.modules.organizer.classes || {};

tswlairmgr.modules.organizer.classes.ChatScriptOrderEnum = new function() {
	this.o = {
		BY_PARTICIPANT: "participantOrder",
		BY_MISSION: "missionOrder"
	};
	
	this.orderExists = function(orderStyle) {
		var found = false;
		$.each(this.o, function(key, code) {
			if(code === orderStyle)
			{
				found = true;
				return;
			}
		});
		if(!found) { return false; }
		return true;
	};
};