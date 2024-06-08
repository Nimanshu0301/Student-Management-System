<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
    public function getUsers(Request $request, $id = null)
    {
        try {
            // Set CORS headers
            header('Access-Control-Allow-Origin: http://localhost:3000');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
            header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

            $data = [];

            $query = DB::table('tblusers')->select('FirstName', 'LastName', 'Email', 'ID', 'ContactNumber');

            if (!is_null($id) && is_numeric($id)) {
                $user = $query->where('ID', $id)->first();

                if (!$user) {
                    return response()->json(['message' => 'User not found'], 404);
                }

                $data[] = $user;
            } else {
                $users = $query->get();
                $data = $users->toArray();
            }

            return response()->json($data);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database Error: ' . $e->getMessage()], 500);
        }
    }
}
