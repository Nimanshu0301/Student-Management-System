<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnswersController extends Controller
{
    public function insertAnswer(Request $request)
    {
        try {
            // Set CORS headers
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Headers: *');
            header('Access-Control-Allow-Methods: *');

            $data = $request->json()->all();

            $userID = $data['UserID'];
            $questionID = $data['QuestionID'];
            $answer = $data['Answer'];

            $result = DB::table('tblanswers')->insert([
                'UserID' => $userID,
                'QuestionID' => $questionID,
                'Answer' => $answer,
            ]);

            if ($result) {
                return response()->json(['status' => 1, 'message' => 'Answer inserted successfully.']);
            } else {
                return response()->json(['status' => 0, 'message' => 'Failed to insert answer.']);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }
}
