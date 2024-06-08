<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class submitExamController extends Controller
{
    public function insertAnswersAndMarks(Request $request)
    {
        try {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Headers: *');
            header('Access-Control-Allow-Methods: *');

            $server = 'localhost:3306';
            $dbname = 'nxb4401_studentmsd';
            $user = 'nxb4401_root';
            $pass = 'NXB@2023666';

            $conn = new \PDO('mysql:host=' . $server . ';dbname=' . $dbname, $user, $pass);
            $conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

            if ($request->isMethod('post')) {
                $requestData = $request->json()->all();

                $sql = "INSERT INTO tblanswers (UserID, QuestionID, StudentAnswer, Correct, CourseID) 
                        VALUES (:UserID, :QuestionID, :StudentAnswer, :Correct, :CourseID)";
                $stmt = $conn->prepare($sql);

                foreach ($requestData['answers'] as $answer) {
                    $UserID = $answer['UserID'];
                    $StudentAnswer = $answer['StudentAnswer'];
                    $QuestionID = $answer['QuestionID'];
                    $CourseID = $answer['CourseID'];

                    $sqlQuestion = "SELECT Answer FROM tblquestions WHERE ID = :QuestionID";
                    $stmtQuestion = $conn->prepare($sqlQuestion);
                    $stmtQuestion->bindParam(':QuestionID', $QuestionID);
                    $stmtQuestion->execute();
                    $result = $stmtQuestion->fetch(\PDO::FETCH_ASSOC);

                    $Correct = ($StudentAnswer == $result['Answer']) ? 'Yes' : 'No';

                    $stmt->bindParam(':UserID', $UserID);
                    $stmt->bindParam(':QuestionID', $QuestionID);
                    $stmt->bindParam(':StudentAnswer', $StudentAnswer);
                    $stmt->bindParam(':Correct', $Correct);
                    $stmt->bindParam(':CourseID', $CourseID);
                    $stmt->execute();
                }

                // Insert into tblmarks
                $marksSql = "INSERT INTO tblmarks (CourseID, StudentID, TotalQuestions, TotalCorrects, Marks) 
                             SELECT 
                                 a.CourseID, 
                                 a.UserID, 
                                 (SELECT COUNT(*) FROM tblquestions q WHERE q.CourseID = a.CourseID) AS TotalQuestions,
                                 (SELECT COUNT(*) FROM tblanswers ans WHERE ans.CourseID = a.CourseID AND ans.Correct = 'Yes' AND ans.UserID = a.UserID) AS TotalCorrects,
                                 CASE WHEN (SELECT COUNT(*) FROM tblquestions q WHERE q.CourseID = a.CourseID) > 0 
                                 THEN ROUND(((SELECT COUNT(*) FROM tblanswers ans WHERE ans.CourseID = a.CourseID AND ans.Correct = 'Yes' AND ans.UserID = a.UserID) / 
                                 (SELECT COUNT(*) FROM tblquestions q WHERE q.CourseID = a.CourseID)) * 100, 0) ELSE 0 END AS Marks
                             FROM (
                                 SELECT DISTINCT UserID, CourseID 
                                 FROM tblanswers
                             ) a";
                $marksStmt = $conn->prepare($marksSql);
                $marksStmt->execute();

                $response = ['status' => 1, 'message' => 'Answers and marks inserted successfully'];
                return response()->json($response);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 0, 'message' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }
}
