<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\category;
use App\Models\contact;
use App\Models\categorycontact;

class categoryController extends Controller
{
    public function createCategory(Request $request)
    {
    	$currentUser = Auth::user();
    	$category = new category;
    	$category->id_user = $currentUser->id;
    	$category->category_name = $request->category_name;
    	$category->save();

    	if (! empty($category->id)) {
            return response()->json([
                'status' => 200,
                'message' => 'Category successfully inserted',
                'data' => $category,
            ], 200);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => $category,
            ]);
        }
    }

    public function getCategory()
    {
    	$currentUser = Auth::user();
    	if((category::where('id_user', $currentUser->id)->count()) > 0){
            $data = category::where('id_user', $currentUser->id)->get();
            return response()->json([
                    'status' => 200,
                    'message' => 'Success',
                    'data' => $data,
                ], 200);
            }else{
                return response()->json([
                    'status' => 200,
                    'message' => 'There is no category found',
                    'data' => [],
                    
                ], 200);    
            } 
    }

    public function updateCategory(Request $request)
    {
    	$currentUser = Auth::user();
        if ((category::where('id_user', $currentUser->id)->count()) > 0){
            if((category::where('id', $request->id)->count()) > 0){
                $category = category::find($request->id);
                $category->category_name = is_null($request->category_name) ? $category->category_name : $request->category_name;
                $category->save();

                if (! empty($category->id)) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'Category successfully updated',
                        'data' => $category,
                    ], 200);
                }else{
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => $category,
                    ]);
                }
            }else{
               return response()->json([
                    'status' => 200,
                    'message' => 'There is no category found',
                    'data' => [],
                ], 200);
            }
            
        }else{
            return response()->json([
                'status' => 200,
                'message' => 'User not found',
                'data' => [],
            ]);
        }
    }

    public function deleteCategory(Request $request)
    {
    	$currentUser = Auth::user();
        if((category::where('id_user', $currentUser->id)->count()) > 0) {
            if((category::where('id', $request->id)->count())>0){
                $category = category::find($request->id);
                $category->delete();                
             
                return response()->json([
                    "status" => 200,
                    "message" => "records deleted",
                    "data" => $category,
                ], 200);
            }else{
                 return response()->json([
                    "status" => 200,
                    "message" => "There is no category found",
                    "data" => [],
                ], 200);
            }
        }else {
            return response()->json([
                "status" => 200,
                "message" => "User not found",
                "data" => [],
            ], 200);
      }
    }

    public function createMember(Request $request)
    {
    	$categoryContact = new categorycontact;
    	if((category::where('id', $request->id_category)->count()) > 0) {
    		$category = category::find($request->id_category);
            $category->jumlah_member = $category->jumlah_member + 1;
            $category->save();
    		$categoryContact->id_category = $category->id;
    		if((contact::where('id', $request->id_contact)->count()) > 0){
    			$contact = contact::find($request->id_contact);
    			$categoryContact->id_contact = $contact->id;
    			$categoryContact->save();
    		}else{
    			return response()->json([
                    "status" => 200,
                    "message" => "There is no contact found",
                    "data" => [],
                ], 200);
    		}
    	}else{
    		return response()->json([
                    "status" => 200,
                    "message" => "There is no category found",
                    "data" => [],
                ], 200);
    	}
    	

    	if (! empty($categoryContact->id)) {
            return response()->json([
                'status' => 200,
                'message' => 'Category successfully inserted',
                'data' => $category,
            ], 200);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => $category,
            ]);
        }
    }

    public function getMember(Request $request)
    {	
    	if((categorycontact::where('id_category', $request->id_category)->count()) > 0){
    		// $categoryContact = categorycontact::where('id_category', $request->id_category)->get();
      //       foreach ($categoryContact as $d) {
      //           if((category::where('id', $d->id_category)->count()) > 0){
      //               $category = category::where('id', $d->id_category)->get('category_name','id_user');
      //               echo $category->;
      //               if((contact::where('id', $d->id_contact)->count()) > 0){
      //                   $contact = (contact::where('id', $d->id_contact)->get());
      //               }
      //           }
      //           $new[] = ([
      //            'id_user' => $contact,
      //            'id_member' => $d->id,   
      //            'id_category' => $d->id_category,
      //            'id_contact' => $d->id_contact,
      //            ]);

      //       }
            $category = category::select('category_table.id_user', 'category_table.id AS id_category', 'category_table.category_name', category::raw('COUNT(categorycontact_table.id) AS jumlah_member'))
                        ->join('categorycontact_table', 'categorycontact_table.id_category', '=', 'category_table.id')
                        ->where('category_table.id', $request->id_category)
                        ->groupBy('category_table.id_user')
                        ->get();
            $member = categoryContact::select('categorycontact_table.id AS id_member', 'contact_table.id AS id_contact', 'contact_table.contact_name', 'contact_table.contact_number' )
                    ->join('contact_table', 'contact_table.id', '=', 'categorycontact_table.id_contact')
                    ->join('category_table', 'category_table.id', '=', 'categorycontact_table.id_category')
                    ->where('category_table.id', $request->id_category)
                    ->get();

    		return response()->json([
                    'status' => 200,
                    'message' => 'Success',
                    'data' => $category, 
                    'member' => $member,
                ], 200);
    	}else{
               return response()->json([
                    'status' => 200,
                    'message' => 'There is no member found',
                    'data' => [],
                ], 200);
            }
    }

    public function deleteMember(Request $request)
    {
        if((categorycontact::where('id_category', $request->id_category)->where('id', $request->id_member)->count()) > 0){
            $member = categorycontact::where('id_category', $request->id_category)->where('id', $request->id_member);
            $data = $member->get();
            $member->delete();

            $category = category::find($request->id_category);
            $category->jumlah_member = $category->jumlah_member - 1;
            $category->save();
             return response()->json([
                    "status" => 200,
                    "message" => "records deleted",
                    "data" => $data,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "There is no category found",
                "data" => [],
             ], 200);       
        }  
    }

    public function getMemberById($id_category)
    {
       if((categorycontact::where('id_category', $id_category)->count()) > 0){
            $category = category::select('category_table.id_user', 'category_table.id AS id_category', 'category_table.category_name', category::raw('COUNT(categorycontact_table.id) AS jumlah_member'))
                        ->join('categorycontact_table', 'categorycontact_table.id_category', '=', 'category_table.id')
                        ->where('category_table.id', $id_category)
                        ->groupBy('category_table.id_user')
                        ->get();
            $member = categoryContact::select('categorycontact_table.id AS id_member', 'contact_table.id AS id_contact', 'contact_table.contact_name', 'contact_table.contact_number' )
                    ->join('contact_table', 'contact_table.id', '=', 'categorycontact_table.id_contact')
                    ->join('category_table', 'category_table.id', '=', 'categorycontact_table.id_category')
                    ->where('category_table.id', $id_category)
                    ->get();

            return response()->json([
                    'status' => 200,
                    'message' => 'Success',
                    'data' => $category, 
                    'member' => $member,
                ], 200);
        }else{
               return response()->json([
                    'status' => 200,
                    'message' => 'There is no member found',
                    'data' => [],
                ], 200);
            } 
    }

    public function getCategoryById($id)
    {
        if((category::where('id', $id)->count()) > 0){
            $data = category::where('id', $id)->get();
            return response()->json([
                    'status' => 200,
                    'message' => 'Success',
                    'data' => $data,
                ], 200);
            }else{
                return response()->json([
                    'status' => 200,
                    'message' => 'There is no category found',
                    'data' => [],
                    
                ], 200);    
            } 
    }

    public function createCategoryDB($request)
    {
        $category = new category;
        $category->id_user = $request->id_user;
        $category->category_name = $request->category_name;
        $category->save();

        if (! empty($category->id)) {
            return response()->json([
                'status' => 200,
                'message' => 'Category successfully inserted',
                'data' => $category,
            ], 200);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => $category,
            ]);
        }
    }

    public function addMemberCategory($request)
    {
        $categoryContact = new categorycontact;
        if((category::where('id', $request->id_category)->count()) > 0) {
            $category = category::find($request->id_category);
            $category->jumlah_member = $category->jumlah_member + 1;
            $category->save();
            $categoryContact->id_category = $category->id;
            if((contact::where('id', $request->id_contact)->count()) > 0){
                $contact = contact::find($request->id_contact);
                $categoryContact->id_contact = $contact->id;
                $categoryContact->save();
            }else{
                return response()->json([
                    "status" => 200,
                    "message" => "There is no contact found",
                    "data" => [],
                ], 200);
            }
        }else{
            return response()->json([
                    "status" => 200,
                    "message" => "There is no category found",
                    "data" => [],
                ], 200);
        }
        

        if (! empty($categoryContact->id)) {
            return response()->json([
                'status' => 200,
                'message' => 'Category successfully inserted',
                'data' => $category,
            ], 200);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => $category,
            ]);
        }
    }
}
