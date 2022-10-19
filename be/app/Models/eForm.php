<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class eForm extends Model
{
    use HasFactory;
    protected $table = 'eform_table';
    public $timestamps = false;
}
