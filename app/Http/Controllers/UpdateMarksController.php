<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UpdateMarksController extends Controller
{
    public function updateInstructorResult(Request $request)
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
                $data = $request->json()->all();

                $userID = $data['UserID'];
                $courseID = $data['CourseID'];
                $instructorResult = $data['InstructorResult'];

                $sql = "UPDATE tblmarks SET InstructorResult = :InstructorResult WHERE StudentID = :StudentID AND CourseID = :CourseID";

                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':StudentID', $userID);
                $stmt->bindParam(':CourseID', $courseID);
                $stmt->bindParam(':InstructorResult', $instructorResult);

                try {
                    $stmt->execute();
                    return response()->json(['message' => 'InstructorResult updated successfully']);
                } catch (\PDOException $e) {
                    return response()->json(['error' => 'Error updating InstructorResult: ' . $e->getMessage()], 500);
                }
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }
}
