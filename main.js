/*
 *	Header and footer that starts and ends the table
 */
var head = '\\begin{center}\n'
			+ '\\begin{tabular}{ | l | p{7cm} |}\n'
			+ '\\hline\n';
var foot = '\\end{tabular} \n \\end{center}';

/*
 *	Append a form corresponding to a new table element
 */
$('#add-table-row').click(function() {	
	$('.input-lists').append('\
		<dt class="row-element"><br>\
			<input class="input row-name" type="text" placeholder="Row Name">\
			<textarea class="textarea row-content" placeholder="Row Content"></textarea>\
			<button class="button is-danger" id="delete-table-row">Delete Table Row</button>\
		<br></dt>\
	');
});

/*
 *	Delete the table row
 */
$(document).on('click', '#delete-table-row', function(){ 
	$(this).parent().remove();
}); 


/*
 *	Submit and write the table code
 */
$('#submit').click(function() {

	var nodeLength = $('.input-lists').find('.row-element').length;
	var final = head;

	// For each table element
	for(var i=0;i<nodeLength;i++) {

		// Get the values of both the row-name and row-content
		var input = $(document).find('.row-name').get(i).value.trim();
		var text = $(document).find('.row-content').get(i).value.trim();

		// If both fields are empty, skip, otherwise fill any empty field with FILL
		if(input.length < 1 && text.length < 1) continue;
		if(input.length < 1) input = 'FILL';
		if(text.length < 1) input = 'FILL';

		// Split the row-content by newlines for enumeration
		var textLines = text.split('\n');

		// Start of our final row element in latex
		var textFin = '\\parbox{.45\\textwidth}{\\begin{enumerate}\n';

		// For each line of text in the row-content
		for(var j = 0;j < textLines.length;j++) {
			// if the length is equal to 1, we add item[] instead of item
			// this assures we maintain indentation while removing the redundant number in the list
			// otherwise we keep the enumeration
			if(textLines.length === 1) 
				textFin = textFin + '\\item[] ' + textLines[j] + '\n';
			else 
				textFin = textFin + '\\item ' + textLines[j] + '\n';
		}
		// add the final closing tags for the row element
		textFin = textFin + '\\end{enumerate}} \n \\\\ \\hline\n';
		// add it to the final string for the row element
		final = final + '\\textbf{' + input + '} & ' + textFin;
	}
	// all elements done, show updates in new text area
	final = final + foot;
	$('#final').text(final);
});
