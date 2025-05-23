"""rename name to customer

Revision ID: b3064d8f09c6
Revises: 60d904a962ee
Create Date: 2025-04-15 13:26:26.009978

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b3064d8f09c6'
down_revision = '60d904a962ee'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('orders', 'name',  new_column_name='customer')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('orders', 'customer',  new_column_name='name')

    # ### end Alembic commands ###
