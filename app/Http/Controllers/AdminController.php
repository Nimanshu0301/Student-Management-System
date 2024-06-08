<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function getUsers()
    {
        try {
            // Set CORS headers
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Headers: *');
            header('Access-Control-Allow-Methods: *');

            if (request()->isMethod('GET')) {
                $userType = "Admin";

                $qaos = DB::table('tblusers')
                    ->select('ID', 'FirstName', 'LastName', 'Email', 'ContactNumber')
                    ->where('UserType', $userType)
                    ->get()
                    ->toArray();

                return response()->json($qaos);
            } else {
                return response()->json(['error' => 'Invalid request method.'], 405);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }

    public function deleteUser(Request $request)
    {
        try {
            // Set CORS headers
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Headers: *');
            header('Access-Control-Allow-Methods: *');

            if ($request->isMethod('POST')) {
                $data = $request->json()->all();
                $id = $data['ID'];

                $stmt = DB::table('tblusers')->where('ID', $id)->delete();

                if ($stmt) {
                    return response()->json(['status' => 1, 'message' => 'Record deleted successfully.']);
                } else {
                    return response()->json(['status' => 0, 'message' => 'Failed to delete record.']);
                }
            } else {
                return response()->json(['error' => 'Invalid request method.'], 405);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }
}
