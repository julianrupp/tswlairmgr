var tswlairmgr = tswlairmgr || {};
tswlairmgr.core = tswlairmgr.core || {};
tswlairmgr.core.data = tswlairmgr.core.data || {};

tswlairmgr.core.data._bootstrap_alphabet_greek = function()
{
	var characterIDs = [
		"alpha", "beta", "gamma", "delta",
		"epsilon", "zeta", "eta", "theta",
		"iota", "kappa", "lambda", "mu",
		"nu", "xi", "omicron", "pi",
		"rho", "sigma", "tau", "upsilon",
		"phi", "chi", "psi", "omega"
	];
	
	var map = {};
	
	$.each(characterIDs, function(index, key) {
		map[key] = new tswlairmgr.core.data.AlphabetCharacter();
	});
	
	this.struct.alphabetGreek = map;
	
	console.log("<tswlairmgr.core.data-structure>: bootstrap: Alphabet <Greek>: objects created");
};

tswlairmgr.core.data._bootstrap_alphabet_phoenician = function()
{
	var characterIDs = [
		"aleph", "beth", "gamal", "dalath",
		"he", "waw", "zain", "heth",
		"teth", "yudh", "kaph", "lamadh",
		"mim", "nun", "semkath", /* "ayin", (unused so far) */
		"pe", "sadhe", "qoph", "resh",
		"shin", /* "taw", (unused so far) */ "e"
	];
	
	var map = {};
	
	$.each(characterIDs, function(index, key) {
		map[key] = new tswlairmgr.core.data.AlphabetCharacter();
	});
	
	this.struct.alphabetPhoenician = map;
	
	console.log("<tswlairmgr.core.data-structure>: bootstrap: Alphabet <Phoenician>: objects created");
};

tswlairmgr.core.data._bootstrap_region_sol_zone_km = function()
{
	/* Bosses */
	this.struct.solKMLairBoss1 = new tswlairmgr.core.data.Boss("km01",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.theta, 4),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.kappa, 9),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.psi, 8),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.chi, 1),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.epsilon, 5),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.eta, 5),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.xi, 3),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.zeta, 8),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.beta, 6)
	}));
	this.struct.solKMLairBoss2 = new tswlairmgr.core.data.Boss("km02",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.lambda, 3),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.pi, 4),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.upsilon, 4),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.rho, 7),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.tau, 5),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.xi, 5),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.rho, 1),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.tau, 6),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.omicron, 7)
	}));
	this.struct.solKMLairBoss3 = new tswlairmgr.core.data.Boss("km03",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.gamma, 9),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.phi, 3),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.gamma, 5),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.alpha, 3),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.xi, 4),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.theta, 9),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.lambda, 1),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.gamma, 1),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.phi, 7)
	}));
	
	/* Lair */
	this.struct.solKMLair = new tswlairmgr.core.data.Lair("km", [
		this.struct.solKMLairBoss1,
		this.struct.solKMLairBoss2,
		this.struct.solKMLairBoss3
	]);
	
	/* Zone */
	this.struct.solKM = new tswlairmgr.core.data.Zone([
		this.struct.solKMLair
	]);
	
	console.log("<tswlairmgr.core.data-structure>: bootstrap: Zone <Kingsmouth>: objects created");
};

tswlairmgr.core.data._bootstrap_region_sol_zone_sc = function()
{
	/* Bosses */
	this.struct.solSCLairBoss1 = new tswlairmgr.core.data.Boss("sc01",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.pi, 3),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.xi, 8),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.chi, 4),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.omicron, 5),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.delta, 4),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.upsilon, 9),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.omega, 5),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.mu, 1),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.kappa, 6)
	}));
	this.struct.solSCLairBoss2 = new tswlairmgr.core.data.Boss("sc02",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.kappa, 5),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.sigma, 2),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.zeta, 6),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.alpha, 6),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.iota, 3),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.theta, 6),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.lambda, 2),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.psi, 5),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.psi, 2)
	}));
	this.struct.solSCLairBoss3 = new tswlairmgr.core.data.Boss("sc03",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.zeta, 4),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.upsilon, 1),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.omega, 9),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.kappa, 4),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.epsilon, 9),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.delta, 2),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.omicron, 4),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.gamma, 6),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.psi, 3)
	}));
	
	/* Lair */
	this.struct.solSCLair = new tswlairmgr.core.data.Lair("sc", [
		this.struct.solSCLairBoss1,
		this.struct.solSCLairBoss2,
		this.struct.solSCLairBoss3
	]);
	
	/* Zone */
	this.struct.solSC = new tswlairmgr.core.data.Zone([
		this.struct.solSCLair
	]);
	
	console.log("<tswlairmgr.core.data-structure>: bootstrap: Zone <Savage Coast>: objects created");
};

tswlairmgr.core.data._bootstrap_region_sol_zone_bm = function()
{
	/* Bosses */
	this.struct.solBMLairBoss1 = new tswlairmgr.core.data.Boss("bm01",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.nu, 5),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.chi, 7),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.gamma, 4),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.tau, 7),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.zeta, 3),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.chi, 5),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.iota, 5),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.pi, 9),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.nu, 4)
	}));
	this.struct.solBMLairBoss2 = new tswlairmgr.core.data.Boss("bm02",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.kappa, 3),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.upsilon, 6),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.iota, 6),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.delta, 5),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.mu, 6),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.omicron, 1),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.zeta, 1),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.kappa, 7),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.phi, 4)
	}));
	this.struct.solBMLairBoss3 = new tswlairmgr.core.data.Boss("bm03",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.upsilon, 7),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.zeta, 9),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.tau, 2),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.beta, 8),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.nu, 2),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.sigma, 6),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.phi, 6),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.eta, 1),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.lambda, 5)
	}));
	
	/* Lair */
	this.struct.solBMLair = new tswlairmgr.core.data.Lair("bm", [
		this.struct.solBMLairBoss1,
		this.struct.solBMLairBoss2,
		this.struct.solBMLairBoss3
	]);
	
	/* Zone */
	this.struct.solBM = new tswlairmgr.core.data.Zone([
		this.struct.solBMLair
	]);
	
	console.log("<tswlairmgr.core.data-structure>: bootstrap: Zone <Blue Mountain>: objects created");
};

tswlairmgr.core.data._bootstrap_region_sol_regional = function()
{
	this.struct.solRegional = new tswlairmgr.core.data.RegionalBoss("sol",
		new tswlairmgr.core.data.RegionalBossFragmentSet({
			nnww: new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.sadhe, 9, [
					this.struct.solKMLairBoss1
				]
			),
			nnw:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.pe, 8, [
					this.struct.solKMLairBoss3
				]
			),
			nne:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.beth, 2, [
					this.struct.solKMLairBoss2
				]
			),
			nnee: new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.gamal, 3, [
					this.struct.solSCLairBoss3
				]
			),
			nww:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.lamadh, 6, [
					this.struct.solKMLairBoss1,
					this.struct.solKMLairBoss2,
					this.struct.solKMLairBoss3
				]
			),
			nw:   new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.shin, 3, [
					this.struct.solBMLairBoss2
				]
			),
			ne:   new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.lamadh, 3, [
					this.struct.solBMLairBoss1,
					this.struct.solBMLairBoss2,
					this.struct.solBMLairBoss3
				]
			),
			nee:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.he, 5, [
					this.struct.solBMLairBoss1
				]
			),
			sww:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.beth, 5, [
					this.struct.solSCLairBoss1,
					this.struct.solSCLairBoss2,
					this.struct.solSCLairBoss3
				]
			),
			sw:   new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.zain, 7, [
					this.struct.solBMLairBoss3
				]
			),
			se:   new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.beth, 8, [
					this.struct.solBMLairBoss1,
					this.struct.solBMLairBoss2,
					this.struct.solBMLairBoss3
				]
			),
			see:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.teth, 9, [
					this.struct.solSCLairBoss1
				]
			),
			ssww: new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.shin, 6, [
					this.struct.solSCLairBoss1,
					this.struct.solSCLairBoss2,
					this.struct.solSCLairBoss3
				]
			),
			ssw:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.heth, 8, [
					this.struct.solKMLairBoss1,
					this.struct.solKMLairBoss2,
					this.struct.solKMLairBoss3
				]
			),
			sse:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.aleph, 7, [
					this.struct.solKMLairBoss2,
					this.struct.solSCLairBoss1,
					this.struct.solBMLairBoss2
				]
			),
			ssee: new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.mim, 7, [
					this.struct.solSCLairBoss2
				]
			)
		})
	);
	
	console.log("<tswlairmgr.core.data-structure>: bootstrap: Regional <Solomon Island>: object created");
};

tswlairmgr.core.data._bootstrap_region_sol = function()
{
	console.log("<tswlairmgr.core.data-structure>: bootstrap: Region <Solomon Island>: building up...");
	
	this._bootstrap_region_sol_zone_km();
	this._bootstrap_region_sol_zone_sc();
	this._bootstrap_region_sol_zone_bm();
	
	this._bootstrap_region_sol_regional();
	
	this.struct.sol = new tswlairmgr.core.data.Region(
		[
			this.struct.solKM,
			this.struct.solSC,
			this.struct.solBM
		],
		this.struct.solRegional
	);
	
	console.log("<tswlairmgr.core.data-structure>: bootstrap: Region <Solomon Island>: objects created");
};

tswlairmgr.core.data._bootstrap_region_egy_zone_sd = function()
{
	/* Bosses */
	this.struct.egySDLairBoss1 = new tswlairmgr.core.data.Boss("sd01",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.iota, 2),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.beta, 7),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.mu, 5),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.phi, 9),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.alpha, 9),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.tau, 9),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.lambda, 6),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.beta, 3),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.upsilon, 3)
	}));
	this.struct.egySDLairBoss2 = new tswlairmgr.core.data.Boss("sd02",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.iota, 1),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.nu, 7),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.alpha, 5),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.mu, 4),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.chi, 6),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.eta, 8),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.omicron, 8),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.nu, 8),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.zeta, 5)
	}));
	this.struct.egySDLairBoss3 = new tswlairmgr.core.data.Boss("sd03",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.omega, 7),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.pi, 8),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.epsilon, 3),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.lambda, 9),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.gamma, 2),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.omega, 1),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.delta, 8),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.theta, 3),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.rho, 4)
	}));
	
	/* Lair */
	this.struct.egySDLair = new tswlairmgr.core.data.Lair("sd", [
		this.struct.egySDLairBoss1,
		this.struct.egySDLairBoss2,
		this.struct.egySDLairBoss3
	]);
	
	/* Zone */
	this.struct.egySD = new tswlairmgr.core.data.Zone([
		this.struct.egySDLair
	]);
	
	console.log("<tswlairmgr.core.data-structure>: bootstrap: Zone <Scorched Desert>: objects created");
};

tswlairmgr.core.data._bootstrap_region_egy_zone_cs = function()
{
	/* Bosses */
	this.struct.egyCSLairBoss1 = new tswlairmgr.core.data.Boss("cs01",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.upsilon, 2),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.phi, 2),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.delta, 7),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.eta, 2),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.psi, 6),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.xi, 1),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.rho, 3),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.nu, 1),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.omicron, 6)
	}));
	this.struct.egyCSLairBoss2 = new tswlairmgr.core.data.Boss("cs02",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.phi, 5),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.beta, 1),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.iota, 4),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.sigma, 7),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.chi, 3),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.rho, 6),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.xi, 6),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.alpha, 1),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.nu, 3)
	}));
	this.struct.egyCSLairBoss3 = new tswlairmgr.core.data.Boss("cs03",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.pi, 7),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.psi, 9),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.theta, 3),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.omicron, 9),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.tau, 4),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.chi, 2),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.pi, 2),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.iota, 8),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.lambda, 7)
	}));
	
	/* Lair */
	this.struct.egyCSLair = new tswlairmgr.core.data.Lair("cs", [
		this.struct.egyCSLairBoss1,
		this.struct.egyCSLairBoss2,
		this.struct.egyCSLairBoss3
	]);
	
	/* Zone */
	this.struct.egyCS = new tswlairmgr.core.data.Zone([
		this.struct.egyCSLair
	]);
	
	console.log("<tswlairmgr.core.data-structure>: bootstrap: Zone <City of the Sun God>: objects created");
};

tswlairmgr.core.data._bootstrap_region_egy_regional = function()
{
	this.struct.egyRegional = new tswlairmgr.core.data.RegionalBoss("egy",
		new tswlairmgr.core.data.RegionalBossFragmentSet({
			nnww: new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.teth, 3, [
					this.struct.egySDLairBoss1
				]
			),
			nnw:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.kaph, 5, [
					this.struct.egySDLairBoss2
				]
			),
			nne:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.gamal, 6, [
					this.struct.egySDLairBoss3
				]
			),
			nnee: new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.semkath, 6, [
					this.struct.egySDLairBoss1
				]
			),
			nww:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.dalath, 7, [
					this.struct.egyCSLairBoss1,
					this.struct.egyCSLairBoss2,
					this.struct.egyCSLairBoss3
				]
			),
			nw:   new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.pe, 2, [
					this.struct.egyCSLairBoss1,
					this.struct.egyCSLairBoss2,
					this.struct.egyCSLairBoss3
				]
			),
			ne:   new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.waw, 9, [
					this.struct.egyCSLairBoss3
				]
			),
			nee:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.dalath, 1, [
					this.struct.egyCSLairBoss1
				]
			),
			sww:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.e, 1, [
					this.struct.egyCSLairBoss3
				]
			),
			sw:   new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.yudh, 1, [
					this.struct.egyCSLairBoss2
				]
			),
			se:   new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.mim, 4, [
					this.struct.egySDLairBoss1,
					this.struct.egySDLairBoss2,
					this.struct.egySDLairBoss3
				]
			),
			see:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.waw, 6, [
					this.struct.egySDLairBoss3
				]
			),
			ssww: new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.e, 7, [
					this.struct.egyCSLairBoss2
				]
			),
			ssw:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.semkath, 9, [
					this.struct.egyCSLairBoss1
				]
			),
			sse:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.qoph, 1, [
					this.struct.egySDLairBoss1,
					this.struct.egySDLairBoss2,
					this.struct.egySDLairBoss3
				]
			),
			ssee: new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.heth, 2, [
					this.struct.egySDLairBoss2
				]
			)
		})
	);
	
	console.log("<tswlairmgr.core.data-structure>: bootstrap: Regional <Egypt>: object created");
};

tswlairmgr.core.data._bootstrap_region_egy = function()
{
	console.log("<tswlairmgr.core.data-structure>: bootstrap: Region <Egypt>: building up...");
	
	this._bootstrap_region_egy_zone_sd();
	this._bootstrap_region_egy_zone_cs();
	
	this._bootstrap_region_egy_regional();
	
	this.struct.egy = new tswlairmgr.core.data.Region(
		[
			this.struct.egySD,
			this.struct.egyCS
		],
		this.struct.egyRegional
	);
	
	console.log("<tswlairmgr.core.data-structure>: bootstrap: Region <Egypt>: objects created");
};

tswlairmgr.core.data._bootstrap_region_tra_zone_bf = function()
{
	/* Bosses */
	this.struct.traBFLairBoss1 = new tswlairmgr.core.data.Boss("bf01",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.omega, 4),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.omicron, 2),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.delta, 6),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.pi, 6),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.theta, 7),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.mu, 8),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.sigma, 8),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.omega, 6),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.xi, 9)
	}));
	this.struct.traBFLairBoss2 = new tswlairmgr.core.data.Boss("bf02",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.lambda, 4),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.xi, 7),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.alpha, 4),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.psi, 1),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.epsilon, 2),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.theta, 2),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.theta, 1),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.eta, 3),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.mu, 9)
	}));
	this.struct.traBFLairBoss3 = new tswlairmgr.core.data.Boss("bf03",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.alpha, 2),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.zeta, 7),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.gamma, 3),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.epsilon, 1),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.nu, 9),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.epsilon, 7),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.eta, 7),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.theta, 5),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.alpha, 7)
	}));
	
	/* Lair */
	this.struct.traBFLair = new tswlairmgr.core.data.Lair("bf", [
		this.struct.traBFLairBoss1,
		this.struct.traBFLairBoss2,
		this.struct.traBFLairBoss3
	]);
	
	/* Zone */
	this.struct.traBF = new tswlairmgr.core.data.Zone([
		this.struct.traBFLair
	]);
	
	console.log("<tswlairmgr.core.data-structure>: bootstrap: Zone <Besieged Farmlands>: objects created");
};

tswlairmgr.core.data._bootstrap_region_tra_zone_sf = function()
{
	/* Bosses */
	this.struct.traSFLairBoss1 = new tswlairmgr.core.data.Boss("sf01",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.zeta, 2),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.kappa, 2),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.epsilon, 4),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.upsilon, 8),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.eta, 4),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.sigma, 1),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.rho, 8),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.upsilon, 5),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.rho, 2)
	}));
	this.struct.traSFLairBoss2 = new tswlairmgr.core.data.Boss("sf02",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.mu, 3),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.sigma, 3),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.eta, 9),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.phi, 8),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.sigma, 5),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.lambda, 8),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.beta, 2),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.delta, 9),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.nu, 6)
	}));
	this.struct.traSFLairBoss3 = new tswlairmgr.core.data.Boss("sf03",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.kappa, 1),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.tau, 1),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.sigma, 9),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.rho, 9),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.sigma, 4),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.rho, 5),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.phi, 1),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.delta, 1),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.beta, 5)
	}));
	
	/* Lair */
	this.struct.traSFLair = new tswlairmgr.core.data.Lair("sf", [
		this.struct.traSFLairBoss1,
		this.struct.traSFLairBoss2,
		this.struct.traSFLairBoss3
	]);
	
	/* Zone */
	this.struct.traSF = new tswlairmgr.core.data.Zone([
		this.struct.traSFLair
	]);
	
	console.log("<tswlairmgr.core.data-structure>: bootstrap: Zone <Shadowy Forest>: objects created");
};

tswlairmgr.core.data._bootstrap_region_tra_zone_cf = function()
{
	/* Bosses */
	this.struct.traCFLairBoss1 = new tswlairmgr.core.data.Boss("cf01",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.zeta, 2),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.kappa, 2),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.epsilon, 4),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.upsilon, 8),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.eta, 4),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.sigma, 1),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.rho, 8),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.upsilon, 5),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.rho, 2)
	}));
	this.struct.traCFLairBoss2 = new tswlairmgr.core.data.Boss("cf02",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.mu, 3),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.sigma, 3),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.eta, 9),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.phi, 8),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.sigma, 5),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.lambda, 8),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.beta, 2),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.delta, 9),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.nu, 6)
	}));
	this.struct.traCFLairBoss3 = new tswlairmgr.core.data.Boss("cf03",
		new tswlairmgr.core.data.BossFragmentSet({
			nw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.kappa, 1),
			n:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.tau, 1),
			ne: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.sigma, 9),
			w:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.rho, 9),
			c:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.sigma, 4),
			e:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.rho, 5),
			sw: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.phi, 1),
			s:  new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.delta, 1),
			se: new tswlairmgr.core.data.BossFragment(this.struct.alphabetGreek.beta, 5)
	}));
	
	/* Lair */
	this.struct.traCFLair = new tswlairmgr.core.data.Lair("cf", [
		this.struct.traCFLairBoss1,
		this.struct.traCFLairBoss2,
		this.struct.traCFLairBoss3
	]);
	
	/* Zone */
	this.struct.traCF = new tswlairmgr.core.data.Zone([
		this.struct.traCFLair
	]);
	
	console.log("<tswlairmgr.core.data-structure>: bootstrap: Zone <Carpathian Fangs>: objects created");
};

tswlairmgr.core.data._bootstrap_region_tra_regional = function()
{
	this.struct.traRegional = new tswlairmgr.core.data.RegionalBoss("tra",
		new tswlairmgr.core.data.RegionalBossFragmentSet({
			nnww: new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.he, 2, [
					this.struct.traSFLairBoss2
				]
			),
			nnw:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.zain, 1, [
					this.struct.traCFLairBoss3
				]
			),
			nne:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.aleph, 4, [
					this.struct.traBFLairBoss2
				]
			),
			nnee: new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.nun, 5, [
					this.struct.traBFLairBoss1
				]
			),
			nww:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.aleph, 1, [
					this.struct.traBFLairBoss1,
					this.struct.traBFLairBoss2,
					this.struct.traBFLairBoss3
				]
			),
			nw:   new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.resh, 5, [
					this.struct.traSFLairBoss1,
					this.struct.traSFLairBoss2,
					this.struct.traSFLairBoss3
				]
			),
			ne:   new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.he, 8, [
					this.struct.traCFLairBoss1,
					this.struct.traCFLairBoss2,
					this.struct.traCFLairBoss3
				]
			),
			nee:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.resh, 2, [
					this.struct.traSFLairBoss3
				]
			),
			sww:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.yudh, 4, [
					this.struct.traCFLairBoss1
				]
			),
			sw:   new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.gamal, 9, [
					this.struct.traSFLairBoss1,
					this.struct.traSFLairBoss2,
					this.struct.traSFLairBoss3
				]
			),
			se:   new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.nun, 8, [
					this.struct.traCFLairBoss1,
					this.struct.traCFLairBoss2,
					this.struct.traCFLairBoss3
				]
			),
			see:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.sadhe, 3, [
					this.struct.traSFLairBoss1
				]
			),
			ssww: new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.waw, 3, [
					this.struct.traCFLairBoss2
				]
			),
			ssw:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.kaph, 2, [
					this.struct.traBFLairBoss1,
					this.struct.traBFLairBoss2,
					this.struct.traBFLairBoss3
				]
			),
			sse:  new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.dalath, 4, [
					this.struct.traBFLairBoss3,
					this.struct.traSFLairBoss1,
					this.struct.traSFLairBoss2,
					this.struct.traSFLairBoss3,
					this.struct.traCFLairBoss1,
					this.struct.traCFLairBoss2,
					this.struct.traCFLairBoss3
				]
			),
			ssee: new tswlairmgr.core.data.RegionalBossFragment(this.struct.alphabetPhoenician.qoph, 4, [
					this.struct.traBFLairBoss3
				]
			)
		})
	);
	
	console.log("<tswlairmgr.core.data-structure>: bootstrap: Regional <Transylvania>: object created");
};

tswlairmgr.core.data._bootstrap_region_tra = function()
{
	console.log("<tswlairmgr.core.data-structure>: bootstrap: Region <Transylvania>: building up...");
	
	this._bootstrap_region_tra_zone_bf();
	this._bootstrap_region_tra_zone_sf();
	this._bootstrap_region_tra_zone_cf();
	
	this._bootstrap_region_tra_regional();
	
	this.struct.tra = new tswlairmgr.core.data.Region(
		[
			this.struct.traBF,
			this.struct.traSF,
			this.struct.traCF
		],
		this.struct.traRegional
	);
	
	console.log("<tswlairmgr.core.data-structure>: bootstrap: Region <Transylvania>: objects created");
};

tswlairmgr.core.data._bootstrap = function()
{
	console.log("<tswlairmgr.core.data-structure>: bootstrap: starting...");
	
	this.struct = {};
	
	this._bootstrap_alphabet_greek();
	this._bootstrap_alphabet_phoenician();
	
	this._bootstrap_region_sol();
	this._bootstrap_region_egy();
	this._bootstrap_region_tra();
	
	this.struct.keyed = {
		alphabets: {
			greek: this.struct.alphabetGreek,
			phoenician: this.struct.alphabetPhoenician
		},
		regions: {
			sol: {
				region: this.struct.sol,
				regional: this.struct.solRegional,
				zones: {
					km: {
						zone: this.struct.solKM,
						lairs: [
							{
								lair: this.struct.solKMLair,
								bosses: [
									{
										boss: this.struct.solKMLairBoss1
									},
									{
										boss: this.struct.solKMLairBoss2
									},
									{
										boss: this.struct.solKMLairBoss3
									}
								]
							}
						]
					},
					sc: {
						zone: this.struct.solSC,
						lairs: [
							{
								lair: this.struct.solSCLair,
								bosses: [
									{
										boss: this.struct.solSCLairBoss1
									},
									{
										boss: this.struct.solSCLairBoss2
									},
									{
										boss: this.struct.solSCLairBoss3
									}
								]
							}
						]
					},
					bm: {
						zone: this.struct.solBM,
						lairs: [
							{
								lair: this.struct.solBMLair,
								bosses: [
									{
										boss: this.struct.solBMLairBoss1
									},
									{
										boss: this.struct.solBMLairBoss2
									},
									{
										boss: this.struct.solBMLairBoss3
									}
								]
							}
						]
					}
				}
			},
			egy: {
				region: this.struct.egy,
				regional: this.struct.egyRegional,
				zones: {
					sd: {
						zone: this.struct.egySD,
						lairs: [
							{
								lair: this.struct.egySDLair,
								bosses: [
									{
										boss: this.struct.egySDLairBoss1
									},
									{
										boss: this.struct.egySDLairBoss2
									},
									{
										boss: this.struct.egySDLairBoss3
									}
								]
							}
						]
					},
					cs: {
						zone: this.struct.egyCS,
						lairs: [
							{
								lair: this.struct.egyCSLair,
								bosses: [
									{
										boss: this.struct.egyCSLairBoss1
									},
									{
										boss: this.struct.egyCSLairBoss2
									},
									{
										boss: this.struct.egyCSLairBoss3
									}
								]
							}
						]
					}
				}
			},
			tra: {
				region: this.struct.tra,
				regional: this.struct.traRegional,
				zones: {
					bf: {
						zone: this.struct.traBF,
						lairs: [
							{
								lair: this.struct.traBFLair,
								bosses: [
									{
										boss: this.struct.traBFLairBoss1
									},
									{
										boss: this.struct.traBFLairBoss2
									},
									{
										boss: this.struct.traBFLairBoss3
									}
								]
							}
						]
					},
					sf: {
						zone: this.struct.traSF,
						lairs: [
							{
								lair: this.struct.traSFLair,
								bosses: [
									{
										boss: this.struct.traSFLairBoss1
									},
									{
										boss: this.struct.traSFLairBoss2
									},
									{
										boss: this.struct.traSFLairBoss3
									}
								]
							}
						]
					},
					cf: {
						zone: this.struct.traCF,
						lairs: [
							{
								lair: this.struct.traCFLair,
								bosses: [
									{
										boss: this.struct.traCFLairBoss1
									},
									{
										boss: this.struct.traCFLairBoss2
									},
									{
										boss: this.struct.traCFLairBoss3
									}
								]
							}
						]
					}
				}
			}
		}
	};
	
	this._struct = this.struct.keyed;
	delete this.struct;
	
	this._sortedLairs = [
		{
			key: "sol",
			zones: [
				{ key: "km" },
				{ key: "sc" },
				{ key: "bm" }
			]
		},
		{
			key: "egy",
			zones: [
				{ key: "sd" },
				{ key: "cs" }
			]
		},
		{
			key: "tra",
			zones: [
				{ key: "bf" },
				{ key: "sf" },
				{ key: "cf" }
			]
		}
	];
	
	console.log("<tswlairmgr.core.data-structure>: bootstrap: completed");
};

tswlairmgr.core.data._bootstrap();