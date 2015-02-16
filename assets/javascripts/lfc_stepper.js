function lfc_stepper_down(controls_element)
{
	count = controls_element.getElementsByClassName('count')[0].innerHTML;
	if(!isNaN(count))
	{
		if(parseInt(count) > 0)
		{
			count--;
			controls_element.getElementsByClassName('count')[0].innerHTML = count;
			unhandled_changes = true;
		}
	}
}

function lfc_stepper_up(controls_element)
{
	count = controls_element.getElementsByClassName('count')[0].innerHTML;
	if(!isNaN(count))
	{
		if(parseInt(count) < 99)
		{
			count++;
			controls_element.getElementsByClassName('count')[0].innerHTML = count;
			unhandled_changes = true;
		}
	}
}

function lfc_stepper_get_count(controls_element)
{
	count = controls_element.getElementsByClassName('count')[0].innerHTML;
	if(!isNaN(count))
	{
		return(parseInt(count));
	}
}

function lfc_stepper_set_count(controls_element, count)
{
	controls_element.getElementsByClassName('count')[0].innerHTML = count;
}

function lfc_stepper_get_after(controls_element)
{
	count = controls_element.getElementsByClassName('count-after')[0].innerHTML;
	if(!isNaN(count))
	{
		return(parseInt(count));
	}
}

function lfc_stepper_set_after(controls_element, count)
{
	controls_element.getElementsByClassName('count-after')[0].innerHTML = count;
}

function lfc_stepper_get_controls(supernode)
{
	controls = supernode.getElementsByClassName('lairfragment-controls');
	return(controls);
}