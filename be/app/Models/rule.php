<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class rule extends Model
{
	protected $table = 'rule_table';
    use HasFactory;
    public $timestamps = false;
}
