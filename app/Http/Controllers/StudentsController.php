<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StudentsController extends Controller
{
    public function getStudents(Request $request)
    {
        try {
            // Set CORS headers
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Headers: *');
            header('Access-Control-Allow-Methods: *');

            if ($request->isMethod('GET')) {
                $userType = 'Student';

                $students = DB::table('tblusers')
                    ->select('ID', 'FirstName', 'LastName', 'Email', 'ContactNumber')
                    ->where('UserType', $userType)
                    ->get();

                return response()->json($students);
            } elseif ($request->isMethod('POST')) {
                $data = json_decode($request->getContent());
                $id = $data->ID;

                $result = DB::table('tblusers')
                    ->where('ID', $id)
                    ->delete();

                $response = [
                    'status' => 0,
                    'message' => 'Failed to delete record.'
                ];

                if ($result) {
                    $response = [
                        'status' => 1,
                        'message' => 'Record deleted successfully.'
                    ];
                }

                return response()->json($response);
            } else {
                return response()->json(['error' => 'Invalid request method.'], 405);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }
}
