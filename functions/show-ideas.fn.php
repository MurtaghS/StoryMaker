<?php

function showIdeas(){
	global $db;
	$output = "";

	$stmt = $db->prepare("SELECT * FROM `ideas` ORDER BY `idea_id` DESC");
	$stmt->bind_result($idea_id, $idea);
	$stmt->execute();

	while ($stmt->fetch()){
		$output .= "<li>";
		$output .= $idea;
		$output .= "</li>";
	}
	$stmt->close();
	return $output;
}

?>