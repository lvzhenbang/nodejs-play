export default class JsTabs{
	constructor(options){
		this.opts = options || {};
		this.tabs = document.getElementById(this.opts.tabs);

		console.log(this.tabs);
	}
}