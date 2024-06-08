<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GetQuestionsController extends Controller
{
    public function getQuestions(Request $request)
    {
        try {
            // Your database credentials
            $server = 'localhost:3306';
            $dbname = 'nxb4401_studentmsd';
            $user = 'nxb4401_root';
            $pass = 'NXB@2023666';

            $conn = new \PDO('mysql:host=' . $server . ';dbname=' . $dbname, $user, $pass);
            $conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

            if ($request->isMethod('get')) {
                $courseID = $request->input('courseID');

                $sql = "SELECT ID, Questions, Option1, Option2, Option3, Option4, Answer FROM tblquestions WHERE CourseID = :courseID";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':courseID', $courseID);

                if ($stmt->execute()) {
                    $questions = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                    return response()->json($questions);
                } else {
                    return response()->json(['status' => 0, 'message' => 'Failed to retrieve questions.']);
                }
            } else {
                return response()->json(['error' => 'Invalid request method.'], 405);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }
}
