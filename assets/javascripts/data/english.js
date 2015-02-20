var tswlairmgr = tswlairmgr || {};
tswlairmgr.data = tswlairmgr.data || {};
tswlairmgr.data.lairdata = tswlairmgr.data.lairdata || {};

var greek = {
	alpha: "Alpha",
	beta: "Beta",
	gamma: "Gamma",
	delta: "Delta",
	epsilon: "Epsilon",
	zeta: "Zeta",
	eta: "Eta",
	theta: "Theta",
	iota: "Iota",
	kappa: "Kappa",
	lambda: "Lambda",
	mu: "Mu",
	nu: "Nu",
	xi: "Xi",
	omicron: "Omicron",
	pi: "Pi",
	rho: "Rho",
	sigma: "Sigma",
	tau: "Tau",
	upsilon: "Upsilon",
	phi: "Phi",
	chi: "Chi",
	psi: "Psi",
	omega: "Omega"
};

tswlairmgr.data.lairdata = [
	// ===== SOLOMON ISLAND =====
	{
		region:      "sol",
		region_name: "Solomon Island",
		lairs: [
			// Kingsmouth begin
			{
				area:      "km",
				area_name: "Kingsmouth",
				lair_name: "Duma Beach",
				bosses: [
					{
						name:         "Cta-Tha",
						mission_name: "Unto the Beach",
						id:           "01",
						fragments: {
							nw: {letter: greek["theta"], number: "04"},
							n:  {letter: greek["kappa"], number: "09"},
							ne: {letter: greek["psi"], number: "08"},
							w:  {letter: greek["chi"], number: "01"},
							o:  {letter: greek["epsilon"], number: "05"},
							e:  {letter: greek["eta"], number: "05"},
							sw: {letter: greek["xi"], number: "03"},
							s:  {letter: greek["zeta"], number: "08"},
							se: {letter: greek["beta"], number: "06"}
						}
					},
					{
						name:         "Wreathmother",
						mission_name: "Coralations",
						id:           "02",
						fragments: {
							nw: {letter: greek["lambda"], number: "03"},
							n:  {letter: greek["pi"], number: "04"},
							ne: {letter: greek["upsilon"], number: "04"},
							w:  {letter: greek["rho"], number: "07"},
							o:  {letter: greek["tau"], number: "05"},
							e:  {letter: greek["xi"], number: "05"},
							sw: {letter: greek["rho"], number: "01"},
							s:  {letter: greek["tau"], number: "06"},
							se: {letter: greek["omicron"], number: "07"}
						}
					},
					{
						name:         "Head of Glamr",
						mission_name: "The Last Strand",
						id:           "03",
						fragments: {
							nw: {letter: greek["gamma"], number: "09"},
							n:  {letter: greek["phi"], number: "03"},
							ne: {letter: greek["gamma"], number: "05"},
							w:  {letter: greek["alpha"], number: "03"},
							o:  {letter: greek["xi"], number: "04"},
							e:  {letter: greek["theta"], number: "09"},
							sw: {letter: greek["lambda"], number: "01"},
							s:  {letter: greek["gamma"], number: "01"},
							se: {letter: greek["phi"], number: "07"}
						}
					}
				]
			},
			// Kingsmouth end
	
			// Savage Coast begin
			{
				area:      "sc",
				area_name: "Savage Coast",
				lair_name: "The Overlooked",
				bosses: [
					{
						name:         "Lost Sarcoma",
						mission_name: "Sinking Feelings",
						id:           "01",
						fragments: {
							nw: {letter: greek["pi"], number: "03"},
							n:  {letter: greek["xi"], number: "08"},
							ne: {letter: greek["chi"], number: "04"},
							w:  {letter: greek["omicron"], number: "05"},
							o:  {letter: greek["delta"], number: "04"},
							e:  {letter: greek["upsilon"], number: "09"},
							sw: {letter: greek["omega"], number: "05"},
							s:  {letter: greek["mu"], number: "01"},
							se: {letter: greek["kappa"], number: "06"}
						}
					},
					{
						name:         "Filth.Vector",
						mission_name: "Nobel Calling",
						id:           "02",
						fragments: {
							nw: {letter: greek["kappa"], number: "05"},
							n:  {letter: greek["sigma"], number: "02"},
							ne: {letter: greek["zeta"], number: "06"},
							w:  {letter: greek["alpha"], number: "06"},
							o:  {letter: greek["iota"], number: "03"},
							e:  {letter: greek["theta"], number: "06"},
							sw: {letter: greek["lambda"], number: "02"},
							s:  {letter: greek["psi"], number: "05"},
							se: {letter: greek["psi"], number: "02"}
						}
					},
					{
						name:         "Shadow of Depravity",
						mission_name: "The Cover-up",
						id:           "03",
						fragments: {
							nw: {letter: greek["zeta"], number: "04"},
							n:  {letter: greek["upsilon"], number: "01"},
							ne: {letter: greek["omega"], number: "09"},
							w:  {letter: greek["kappa"], number: "04"},
							o:  {letter: greek["epsilon"], number: "09"},
							e:  {letter: greek["delta"], number: "02"},
							sw: {letter: greek["omicron"], number: "04"},
							s:  {letter: greek["gamma"], number: "06"},
							se: {letter: greek["psi"], number: "03"}
						}
					}
				]
			},
			// Savage Coast end
	
			// Blue Mountain begin
			{
				area:      "bm",
				area_name: "Blue Mountain",
				lair_name: "The Casino Pits",
				bosses: [
					{
						name:         "Polluted Effigy",
						mission_name: "The House Always Win",
						id:           "01",
						fragments: {
							nw: {letter: greek["nu"], number: "05"},
							n:  {letter: greek["chi"], number: "07"},
							ne: {letter: greek["gamma"], number: "04"},
							w:  {letter: greek["tau"], number: "07"},
							o:  {letter: greek["zeta"], number: "03"},
							e:  {letter: greek["chi"], number: "05"},
							sw: {letter: greek["iota"], number: "05"},
							s:  {letter: greek["pi"], number: "09"},
							se: {letter: greek["nu"], number: "04"}
						}
					},
					{
						name:         "Ferrous Dueller",
						mission_name: "Picking Up the Pieces",
						id:           "02",
						fragments: {
							nw: {letter: greek["kappa"], number: "03"},
							n:  {letter: greek["upsilon"], number: "06"},
							ne: {letter: greek["iota"], number: "06"},
							w:  {letter: greek["delta"], number: "05"},
							o:  {letter: greek["mu"], number: "06"},
							e:  {letter: greek["omicron"], number: "01"},
							sw: {letter: greek["zeta"], number: "01"},
							s:  {letter: greek["kappa"], number: "07"},
							se: {letter: greek["phi"], number: "04"}
						}
					},
					{
						name:         "Blue Harvester",
						mission_name: "The Whole Truth",
						id:           "03",
						fragments: {
							nw: {letter: greek["upsilon"], number: "07"},
							n:  {letter: greek["zeta"], number: "09"},
							ne: {letter: greek["tau"], number: "02"},
							w:  {letter: greek["beta"], number: "08"},
							o:  {letter: greek["nu"], number: "02"},
							e:  {letter: greek["sigma"], number: "06"},
							sw: {letter: greek["phi"], number: "06"},
							s:  {letter: greek["eta"], number: "01"},
							se: {letter: greek["lambda"], number: "05"}
						}
					}
				]
			}
			// Blue Mountain end
		]
	},
	
	// ===== EGYPT =====
	{
		region:      "egy",
		region_name: "Egypt",
		lairs: [
			// Scorched Desert start
			{
				area:      "sd",
				area_name: "Scorched Desert",
				lair_name: "The Summits",
				bosses: [
					{
						name:         "Eye of the Swarm",
						mission_name: "Return of the Red Nights",
						id:           "01",
						fragments: {
							nw: {letter: greek["iota"], number: "02"},
							n:  {letter: greek["beta"], number: "07"},
							ne: {letter: greek["mu"], number: "05"},
							w:  {letter: greek["phi"], number: "09"},
							o:  {letter: greek["alpha"], number: "09"},
							e:  {letter: greek["tau"], number: "09"},
							sw: {letter: greek["lambda"], number: "06"},
							s:  {letter: greek["beta"], number: "03"},
							se: {letter: greek["upsilon"], number: "03"}
						}
					},
					{
						name:         "Lives-on-Snakes",
						mission_name: "Blood Garments",
						id:           "02",
						fragments: {
							nw: {letter: greek["iota"], number: "01"},
							n:  {letter: greek["nu"], number: "07"},
							ne: {letter: greek["alpha"], number: "05"},
							w:  {letter: greek["mu"], number: "04"},
							o:  {letter: greek["chi"], number: "06"},
							e:  {letter: greek["eta"], number: "08"},
							sw: {letter: greek["omicron"], number: "08"},
							s:  {letter: greek["nu"], number: "08"},
							se: {letter: greek["zeta"], number: "05"}
						}
					},
					{
						name:         "The Idolator",
						mission_name: "Up In Smoke",
						id:           "03",
						fragments: {
							nw: {letter: greek["omega"], number: "07"},
							n:  {letter: greek["pi"], number: "08"},
							ne: {letter: greek["epsilon"], number: "03"},
							w:  {letter: greek["lambda"], number: "09"},
							o:  {letter: greek["gamma"], number: "02"},
							e:  {letter: greek["omega"], number: "01"},
							sw: {letter: greek["theta"], number: "08"},
							s:  {letter: greek["delta"], number: "03"},
							se: {letter: greek["rho"], number: "04"}
						}
					}
				]
			},
			// Scorched Desert end
	
			// City of the Sun God start
			{
				area:      "cs",
				area_name: "City of the Sun God",
				lair_name: "The Blighted Kingdom",
				bosses: [
					{
						name:         "Nyarlat, Royal Executioner",
						mission_name: "Citadel of Pain",
						id:           "01",
						fragments: {
							nw: {letter: greek["upsilon"], number: "02"},
							n:  {letter: greek["phi"], number: "02"},
							ne: {letter: greek["delta"], number: "07"},
							w:  {letter: greek["eta"], number: "02"},
							o:  {letter: greek["psi"], number: "06"},
							e:  {letter: greek["xi"], number: "01"},
							sw: {letter: greek["rho"], number: "03"},
							s:  {letter: greek["nu"], number: "01"},
							se: {letter: greek["omicron"], number: "06"}
						}
					},
					{
						name:         "Hassan, the Ruiner",
						mission_name: "The Trinket Trail",
						id:           "02",
						fragments: {
							nw: {letter: greek["phi"], number: "05"},
							n:  {letter: greek["beta"], number: "01"},
							ne: {letter: greek["iota"], number: "04"},
							w:  {letter: greek["sigma"], number: "07"},
							o:  {letter: greek["chi"], number: "03"},
							e:  {letter: greek["rho"], number: "06"},
							sw: {letter: greek["xi"], number: "06"},
							s:  {letter: greek["alpha"], number: "01"},
							se: {letter: greek["nu"], number: "03"}
						}
					},
					{
						name:         "Duneback",
						mission_name: "The Black Pharaoh's Guard",
						id:           "03",
						fragments: {
							nw: {letter: greek["pi"], number: "07"},
							n:  {letter: greek["psi"], number: "09"},
							ne: {letter: greek["theta"], number: "03"},
							w:  {letter: greek["omicron"], number: "09"},
							o:  {letter: greek["tau"], number: "04"},
							e:  {letter: greek["chi"], number: "02"},
							sw: {letter: greek["pi"], number: "02"},
							s:  {letter: greek["iota"], number: "08"},
							se: {letter: greek["lambda"], number: "07"}
						}
					}
				]
			}
			// City of the Sun God end
		]
	},
	
	// ===== TRANSYLVANIA =====
	{
		region:      "tra",
		region_name: "Transylvania",
		lairs: [
			// Besieged Farmlands start
			{
				area:      "bf",
				area_name: "Besieged Farmlands",
				lair_name: "The Dread Retreat",
				bosses: [
					{
						name:         "Red Revere",
						mission_name: "Midnight Mass",
						id:           "01",
						fragments: {
							nw: {letter: greek["omega"], number: "04"},
							n:  {letter: greek["omicron"], number: "02"},
							ne: {letter: greek["delta"], number: "06"},
							w:  {letter: greek["pi"], number: "06"},
							o:  {letter: greek["theta"], number: "07"},
							e:  {letter: greek["mu"], number: "08"},
							sw: {letter: greek["sigma"], number: "08"},
							s:  {letter: greek["omega"], number: "06"},
							se: {letter: greek["xi"], number: "09"}
						}
					},
					{
						name:         "The Plague",
						mission_name: "Blessed Are The Makers",
						id:           "02",
						fragments: {
							nw: {letter: greek["lambda"], number: "04"},
							n:  {letter: greek["xi"], number: "07"},
							ne: {letter: greek["alpha"], number: "04"},
							w:  {letter: greek["psi"], number: "01"},
							o:  {letter: greek["epsilon"], number: "02"},
							e:  {letter: greek["theta"], number: "02"},
							sw: {letter: greek["theta"], number: "01"},
							s:  {letter: greek["eta"], number: "03"},
							se: {letter: greek["mu"], number: "09"}
						}
					},
					{
						name:         "The Scythian",
						mission_name: "Restoration",
						id:           "03",
						fragments: {
							nw: {letter: greek["alpha"], number: "02"},
							n:  {letter: greek["zeta"], number: "07"},
							ne: {letter: greek["gamma"], number: "03"},
							w:  {letter: greek["epsilon"], number: "01"},
							o:  {letter: greek["nu"], number: "09"},
							e:  {letter: greek["epsilon"], number: "07"},
							sw: {letter: greek["eta"], number: "07"},
							s:  {letter: greek["theta"], number: "05"},
							se: {letter: greek["alpha"], number: "07"}
						}
					}
				]
			},
			// Besieged Farmlands end
	
			// Shadowy Forest start
			{
				area:      "sf",
				area_name: "Shadowy Forest",
				lair_name: "The Spoiled Gardens",
				bosses: [
					{
						name:         "She of Woe",
						mission_name: "The Spoils of Cold War",
						id:           "01",
						fragments: {
							nw: {letter: greek["zeta"], number: "02"},
							n:  {letter: greek["kappa"], number: "02"},
							ne: {letter: greek["epsilon"], number: "04"},
							w:  {letter: greek["upsilon"], number: "08"},
							o:  {letter: greek["eta"], number: "04"},
							e:  {letter: greek["sigma"], number: "01"},
							sw: {letter: greek["rho"], number: "08"},
							s:  {letter: greek["upsilon"], number: "05"},
							se: {letter: greek["rho"], number: "02"}
						}
					},
					{
						name:         "Avatar of the Creep",
						mission_name: "Seedy Underbelly",
						id:           "02",
						fragments: {
							nw: {letter: greek["mu"], number: "03"},
							n:  {letter: greek["sigma"], number: "03"},
							ne: {letter: greek["eta"], number: "09"},
							w:  {letter: greek["phi"], number: "08"},
							o:  {letter: greek["sigma"], number: "05"},
							e:  {letter: greek["lambda"], number: "08"},
							sw: {letter: greek["beta"], number: "02"},
							s:  {letter: greek["delta"], number: "09"},
							se: {letter: greek["nu"], number: "06"}
						}
					},
					{
						name:         "Dacian Pureblood",
						mission_name: "Kreep Rush",
						id:           "03",
						fragments: {
							nw: {letter: greek["kappa"], number: "01"},
							n:  {letter: greek["tau"], number: "01"},
							ne: {letter: greek["sigma"], number: "09"},
							w:  {letter: greek["rho"], number: "09"},
							o:  {letter: greek["sigma"], number: "04"},
							e:  {letter: greek["rho"], number: "05"},
							sw: {letter: greek["phi"], number: "01"},
							s:  {letter: greek["delta"], number: "01"},
							se: {letter: greek["beta"], number: "05"}
						}
					}
				]
			},
			// Shadowy Forest end
	
			// Carpathian Fangs start
			{
				area:      "cf",
				area_name: "Carpathian Fangs",
				lair_name: "The Motherland",
				bosses: [
					{
						name:         "Devourer",
						mission_name: "From Beyond the Iron Curtain",
						id:           "01",
						fragments: {
							nw: {letter: greek["epsilon"], number: "08"},
							n:  {letter: greek["tau"], number: "03"},
							ne: {letter: greek["chi"], number: "08"},
							w:  {letter: greek["pi"], number: "01"},
							o:  {letter: greek["tau"], number: "08"},
							e:  {letter: greek["omicron"], number: "03"},
							sw: {letter: greek["beta"], number: "09"},
							s:  {letter: greek["beta"], number: "04"},
							se: {letter: greek["delta"], number: "08"}
						}
					},
					{
						name:         "The Voivode",
						mission_name: "The Mortal Coil",
						id:           "02",
						fragments: {
							nw: {letter: greek["gamma"], number: "07"},
							n:  {letter: greek["eta"], number: "06"},
							ne: {letter: greek["psi"], number: "04"},
							w:  {letter: greek["psi"], number: "07"},
							o:  {letter: greek["mu"], number: "02"},
							e:  {letter: greek["omega"], number: "03"},
							sw: {letter: greek["omega"], number: "08"},
							s:  {letter: greek["pi"], number: "05"},
							se: {letter: greek["omega"], number: "02"}
						}
					},
					{
						name:         "Vulkan",
						mission_name: "The Shipping News",
						id:           "03",
						fragments: {
							nw: {letter: greek["alpha"], number: "08"},
							n:  {letter: greek["gamma"], number: "08"},
							ne: {letter: greek["kappa"], number: "08"},
							w:  {letter: greek["epsilon"], number: "06"},
							o:  {letter: greek["chi"], number: "09"},
							e:  {letter: greek["iota"], number: "09"},
							sw: {letter: greek["xi"], number: "02"},
							s:  {letter: greek["iota"], number: "07"},
							se: {letter: greek["mu"], number: "07"}
						}
					}
				]
			}
			// Carpathian Fangs end
		]
	}
];

/*
{
	area:      "",
	area_name: "",
	lair_name: "",
	bosses: [
		{
			name:         "",
			mission_name: "",
			id:           "01",
			fragments: {
				nw: greek[""]+"",
				n:  greek[""]+"",
				ne: greek[""]+"",
				w:  greek[""]+"",
				o:  greek[""]+"",
				e:  greek[""]+"",
				sw: greek[""]+"",
				s:  greek[""]+"",
				se: greek[""]+""
			}
		},
		{
			name:         "",
			mission_name: "",
			id:           "02",
			fragments: {
				nw: greek[""]+"",
				n:  greek[""]+"",
				ne: greek[""]+"",
				w:  greek[""]+"",
				o:  greek[""]+"",
				e:  greek[""]+"",
				sw: greek[""]+"",
				s:  greek[""]+"",
				se: greek[""]+""
			}
		},
		{
			name:         "",
			mission_name: "",
			id:           "03",
			fragments: {
				nw: greek[""]+"",
				n:  greek[""]+"",
				ne: greek[""]+"",
				w:  greek[""]+"",
				o:  greek[""]+"",
				e:  greek[""]+"",
				sw: greek[""]+"",
				s:  greek[""]+"",
				se: greek[""]+""
			}
		}
	]
}
*/