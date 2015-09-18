<?php

function showIdeas(){
	global $db;
	$output = "";
	$idea = "";
	$id;

	$stmt = $db->prepare('SELECT * FROM `ideas` ORDER BY `idea_id` DESC');
	$stmt->bind_result($id, $idea);
	$stmt->execute();

	while ($stmt->fetch()){
		$output .= "<li>";
		$output .= $idea;
		$output .= "</li>";
	}

	return $output;
}

?>